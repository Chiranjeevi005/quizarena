"use server";

import { auth } from "@/auth/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import type {
  ChallengeWithQuestionsForAttempt,
  ChallengeStartResult,
  ChallengeSubmitResult,
  AttemptWithDetails,
  QuizAnswerState,
} from "@/types/challenge";

interface ChallengeQuestionWithInclude {
  id: string;
  challengeId: string;
  questionId: string;
  order: number;
  question: {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
  };
}

export async function getActiveDailyChallenge() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const challenge = await prisma.challenge.findFirst({
    where: {
      isPublished: true,
      challengeDate: {
        gte: today,
        lt: tomorrow,
      },
    },
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      challengeDate: "desc",
    },
  });

  if (!challenge) {
    const latestChallenge = await prisma.challenge.findFirst({
      where: {
        isPublished: true,
      },
      include: {
        questions: {
          include: {
            question: true,
          },
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        challengeDate: "desc",
      },
    });
    return latestChallenge;
  }

  return challenge;
}

export async function getLatestChallenge() {
  const challenge = await prisma.challenge.findFirst({
    where: {
      isPublished: true,
    },
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return challenge;
}

export async function getChallengeBySlug(slug: string) {
  const challenge = await prisma.challenge.findUnique({
    where: {
      slug,
    },
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return challenge;
}

export async function getChallengeForAttempt(
  slug: string
): Promise<ChallengeWithQuestionsForAttempt | null> {
  const challenge = await prisma.challenge.findUnique({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!challenge) return null;

  const sanitized = {
    ...challenge,
    questions: challenge.questions.map((cq: ChallengeQuestionWithInclude) => ({
      id: cq.id,
      questionId: cq.questionId,
      question: cq.question.question,
      optionA: cq.question.optionA,
      optionB: cq.question.optionB,
      optionC: cq.question.optionC,
      optionD: cq.question.optionD,
      order: cq.order,
    })),
  };

  return sanitized as ChallengeWithQuestionsForAttempt;
}

export async function startChallenge(slug: string): Promise<ChallengeStartResult> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.AUTH.SIGN_IN);
  }

  const challenge = await getChallengeForAttempt(slug);

  if (!challenge) {
    return { success: false, error: "Challenge not found" };
  }

  const existingAttempt = await prisma.challengeAttempt.findFirst({
    where: {
      userId: session.user.id,
      challengeId: challenge.id,
      submittedAt: null,
    },
  });

  if (existingAttempt) {
    return {
      success: true,
      attemptId: existingAttempt.id,
      challenge,
      existingAttempt,
    };
  }

  const submittedAttempt = await prisma.challengeAttempt.findFirst({
    where: {
      userId: session.user.id,
      challengeId: challenge.id,
      submittedAt: {
        not: null,
      },
    },
    orderBy: {
      submittedAt: "desc",
    },
  });

  if (submittedAttempt) {
    return {
      success: false,
      error: "You have already completed this challenge",
      existingAttempt: submittedAttempt,
    };
  }

  const attempt = await prisma.challengeAttempt.create({
    data: {
      userId: session.user.id,
      challengeId: challenge.id,
    },
  });

  return {
    success: true,
    attemptId: attempt.id,
    challenge,
  };
}

export async function saveAnswer(
  attemptId: string,
  questionId: string,
  selectedOption: string | null
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const attempt = await prisma.challengeAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      submittedAt: null,
    },
  });

  if (!attempt) {
    return { success: false, error: "Attempt not found or already submitted" };
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    return { success: false, error: "Question not found" };
  }

  const isCorrect = selectedOption === question.correctOption;

  const answer = await prisma.userAnswer.upsert({
    where: {
      attemptId_questionId: {
        attemptId,
        questionId,
      },
    },
    update: {
      selectedOption,
      isCorrect,
    },
    create: {
      attemptId,
      questionId,
      selectedOption,
      isCorrect,
    },
  });

  return { success: true, answer };
}

export async function saveMultipleAnswers(attemptId: string, answers: QuizAnswerState) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const attempt = await prisma.challengeAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      submittedAt: null,
    },
  });

  if (!attempt) {
    return { success: false, error: "Attempt not found or already submitted" };
  }

  const questions = await prisma.question.findMany({
    where: {
      id: {
        in: Object.keys(answers),
      },
    },
  });

  const questionMap = new Map(
    questions.map((q: { id: string; correctOption: string }) => [q.id, q])
  );

  const answerData = Object.entries(answers).map(([questionId, selectedOption]) => {
    const question = questionMap.get(questionId);
    return {
      attemptId,
      questionId,
      selectedOption,
      isCorrect: question ? selectedOption === question.correctOption : null,
    };
  });

  for (const answer of answerData) {
    await prisma.userAnswer.upsert({
      where: {
        attemptId_questionId: {
          attemptId: answer.attemptId,
          questionId: answer.questionId,
        },
      },
      update: {
        selectedOption: answer.selectedOption,
        isCorrect: answer.isCorrect,
      },
      create: answer,
    });
  }

  return { success: true };
}

export async function submitChallenge(attemptId: string): Promise<ChallengeSubmitResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const attempt = await prisma.challengeAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      submittedAt: null,
    },
    include: {
      challenge: {
        include: {
          questions: {
            include: {
              question: true,
            },
          },
        },
      },
      answers: true,
    },
  });

  if (!attempt) {
    return { success: false, error: "Attempt not found or already submitted" };
  }

  const allQuestionIds = attempt.challenge.questions.map(
    (cq: ChallengeQuestionWithInclude) => cq.questionId
  );
  const answeredQuestionIds = attempt.answers.map((a: { questionId: string }) => a.questionId);
  const unansweredCount = allQuestionIds.filter(
    (id: string) => !answeredQuestionIds.includes(id)
  ).length;

  const correctAnswers = attempt.answers.filter(
    (a: { isCorrect: boolean | null }) => a.isCorrect === true
  ).length;
  const wrongAnswers = attempt.answers.filter(
    (a: { isCorrect: boolean | null }) => a.isCorrect === false
  ).length;

  const score = correctAnswers;

  const startedAt = attempt.startedAt;
  const submittedAt = new Date();
  const timeTakenInSeconds = Math.floor((submittedAt.getTime() - startedAt.getTime()) / 1000);

  const updatedAttempt = await prisma.challengeAttempt.update({
    where: {
      id: attemptId,
    },
    data: {
      score,
      correctAnswers,
      wrongAnswers,
      unanswered: unansweredCount,
      submittedAt,
      timeTakenInSeconds,
    },
    include: {
      challenge: true,
      answers: true,
    },
  });

  return {
    success: true,
    attempt: updatedAttempt as AttemptWithDetails,
  };
}

interface AttemptWithChallenge {
  id: string;
  userId: string;
  challengeId: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  unanswered: number;
  startedAt: Date;
  submittedAt: Date | null;
  timeTakenInSeconds: number | null;
  challenge: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    examCategory: string | null;
    difficulty: string;
    totalQuestions: number;
    durationInMinutes: number;
    questions: {
      id: string;
      questionId: string;
      order: number;
      question: {
        id: string;
        question: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
      };
    }[];
  };
  answers: {
    id: string;
    attemptId: string;
    questionId: string;
    selectedOption: string | null;
    isCorrect: boolean | null;
  }[];
}

export async function getAttemptById(attemptId: string): Promise<AttemptWithChallenge | null> {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const attempt = await prisma.challengeAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      submittedAt: {
        not: null,
      },
    },
    include: {
      challenge: {
        include: {
          questions: {
            include: {
              question: true,
            },
          },
        },
      },
      answers: true,
    },
  });

  return attempt as AttemptWithChallenge | null;
}

export async function getUserAttempts(userId: string) {
  const attempts = await prisma.challengeAttempt.findMany({
    where: {
      userId,
      submittedAt: {
        not: null,
      },
    },
    include: {
      challenge: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });

  return attempts;
}

export async function getUserLatestAttempt(userId: string) {
  const attempt = await prisma.challengeAttempt.findFirst({
    where: {
      userId,
      submittedAt: {
        not: null,
      },
    },
    include: {
      challenge: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });

  return attempt;
}

export async function hasUserAttemptedChallenge(userId: string, challengeId: string) {
  const attempt = await prisma.challengeAttempt.findFirst({
    where: {
      userId,
      challengeId,
      submittedAt: {
        not: null,
      },
    },
  });

  return !!attempt;
}

export async function getAttemptAnswers(attemptId: string): Promise<QuizAnswerState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {};
  }

  const attempt = await prisma.challengeAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      submittedAt: null,
    },
  });

  if (!attempt) {
    return {};
  }

  const answers = await prisma.userAnswer.findMany({
    where: {
      attemptId,
    },
  });

  const answerState: QuizAnswerState = {};
  for (const answer of answers) {
    if (answer.selectedOption) {
      answerState[answer.questionId] = answer.selectedOption;
    }
  }

  return answerState;
}
