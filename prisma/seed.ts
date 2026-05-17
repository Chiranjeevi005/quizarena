import { loadEnvConfig } from "@next/env";

// Load environment variables
loadEnvConfig(process.cwd());

import { PrismaClient } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/password";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const hashedPassword = await hashPassword(adminPassword);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: "ADMIN",
        name: "QuizArena Admin",
        onboardingCompleted: true,
      },
      create: {
        email: adminEmail,
        password: hashedPassword,
        name: "QuizArena Admin",
        role: "ADMIN",
        onboardingCompleted: true,
      },
    });
    console.log(`Admin user created: ${adminEmail} with role ADMIN`);
  }

  const questions = [
    {
      question: "What is the capital of India?",
      explanation: "New Delhi is the capital of India since 1911.",
      subject: "General Awareness",
      difficulty: "EASY",
      status: "APPROVED",
      options: [
        { optionText: "Mumbai", isCorrect: false, order: 0 },
        { optionText: "New Delhi", isCorrect: true, order: 1 },
        { optionText: "Kolkata", isCorrect: false, order: 2 },
        { optionText: "Chennai", isCorrect: false, order: 3 },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      explanation: "Mars appears red due to iron oxide on its surface.",
      subject: "General Science",
      difficulty: "EASY",
      status: "APPROVED",
      options: [
        { optionText: "Venus", isCorrect: false, order: 0 },
        { optionText: "Mars", isCorrect: true, order: 1 },
        { optionText: "Jupiter", isCorrect: false, order: 2 },
        { optionText: "Saturn", isCorrect: false, order: 3 },
      ],
    },
    {
      question: "What is the largest mammal in the world?",
      explanation: "Blue whales can grow up to 100 feet in length.",
      subject: "General Science",
      difficulty: "EASY",
      status: "APPROVED",
      options: [
        { optionText: "African Elephant", isCorrect: false, order: 0 },
        { optionText: "Blue Whale", isCorrect: true, order: 1 },
        { optionText: "Giraffe", isCorrect: false, order: 2 },
        { optionText: "Polar Bear", isCorrect: false, order: 3 },
      ],
    },
    {
      question: "In which year did India gain independence?",
      explanation: "India gained independence on August 15, 1947.",
      subject: "General Awareness",
      difficulty: "EASY",
      status: "APPROVED",
      options: [
        { optionText: "1945", isCorrect: false, order: 0 },
        { optionText: "1946", isCorrect: false, order: 1 },
        { optionText: "1947", isCorrect: true, order: 2 },
        { optionText: "1948", isCorrect: false, order: 3 },
      ],
    },
    {
      question: "What is 15% of 200?",
      explanation: "15% of 200 = (15/100) × 200 = 30",
      subject: "Quantitative Aptitude",
      difficulty: "EASY",
      status: "APPROVED",
      options: [
        { optionText: "25", isCorrect: false, order: 0 },
        { optionText: "30", isCorrect: true, order: 1 },
        { optionText: "35", isCorrect: false, order: 2 },
        { optionText: "40", isCorrect: false, order: 3 },
      ],
    },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: {
        question: q.question,
        explanation: q.explanation,
        subject: q.subject,
        difficulty: q.difficulty as "EASY" | "MEDIUM" | "HARD",
        status: q.status as "DRAFT" | "REVIEW" | "APPROVED" | "REJECTED" | "ARCHIVED",
        marks: 1,
        negativeMarks: 0.25,
        options: {
          create: q.options,
        },
      },
    });
  }
  console.log("Questions seeded successfully!");

  const user = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (user) {
    const challenge = await prisma.challenge.create({
      data: {
        title: "Daily Challenge - General Knowledge",
        slug: "daily-challenge-general",
        description: "Test your general knowledge with this challenge",
        examCategory: "SSC",
        difficulty: "MEDIUM",
        durationInMinutes: 20,
        totalQuestions: 5,
        totalMarks: 5,
        status: "PUBLISHED",
        publishedAt: new Date(),
        createdById: user.id,
      },
    });

    const allQuestions = await prisma.question.findMany({
      take: 5,
      select: { id: true },
    });

    await Promise.all(
      allQuestions.map((q, index) =>
        prisma.challengeQuestion.create({
          data: {
            challengeId: challenge.id,
            questionId: q.id,
            order: index + 1,
          },
        })
      )
    );
    console.log("Challenge seeded successfully!");
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
