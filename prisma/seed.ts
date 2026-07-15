import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { PrismaClient } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/password";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting robust database seed...");
  const password = await hashPassword("password123");

  // 1. Create Core Personas
  const roles = ["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"];
  const users = await Promise.all(
    roles.map((role) =>
      prisma.user.upsert({
        where: { email: `${role.toLowerCase()}@quizarena.com` },
        update: {},
        create: {
          email: `${role.toLowerCase()}@quizarena.com`,
          password,
          name: `Demo ${role}`,
          role: role as any,
          onboardingCompleted: true,
        },
      })
    )
  );
  console.log(`Created ${users.length} persona accounts (Password: password123)`);

  const adminUser = users.find((u) => u.role === "ADMIN")!;
  const candidateUser = users.find((u) => u.role === "USER")!;

  // 1.5 Create Beta Cohort (10 Mock Users)
  console.log("Generating Beta Cohort of 10 users...");
  const betaTesters = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.user.upsert({
        where: { email: `beta${i + 1}@quizarena.com` },
        update: {},
        create: {
          email: `beta${i + 1}@quizarena.com`,
          password,
          name: `Beta Tester ${i + 1}`,
          role: "USER" as any,
          onboardingCompleted: true,
        },
      })
    )
  );

  // 2. Setup Taxonomy
  console.log("Setting up taxonomy...");
  const subject = await prisma.subject.upsert({
    where: { name: "General Science" },
    update: {},
    create: {
      name: "General Science",
      description: "Basic science principles",
      topics: {
        create: [
          {
            name: "Physics",
            chapters: {
              create: [{ name: "Mechanics" }, { name: "Thermodynamics" }],
            },
          },
        ],
      },
    },
  });

  const chapter = await prisma.chapter.findFirst({ where: { name: "Mechanics" } });

  // 3. Create Question Bank
  const bank = await prisma.questionBank.create({
    data: {
      name: "Global Enterprise Bank",
      isPublic: true,
    },
  });

  // 4. Generate 50 Questions (v1.0 Architecture)
  console.log("Generating 50 Enterprise Questions...");
  const questions = [];
  for (let i = 1; i <= 50; i++) {
    const q = await prisma.question.create({
      data: {
        bankId: bank.id,
        type: "MCQ",
        createdById: adminUser.id,
        revisions: {
          create: {
            revisionNumber: 1,
            status: "PUBLISHED",
            difficulty: ["BEGINNER", "MEDIUM", "HARD"][i % 3] as any,
            chapterId: chapter?.id,
            publishedById: adminUser.id,
            publishedAt: new Date(),
            statement: {
              create: { content: `Sample Enterprise Question ${i}. What is the expected outcome?` },
            },
            explanation: {
              create: { content: `Detailed explanation for question ${i}.` },
            },
            options: {
              create: [
                { content: `Option A for Q${i}`, isCorrect: true, displayOrder: 1 },
                { content: `Option B for Q${i}`, isCorrect: false, displayOrder: 2 },
                { content: `Option C for Q${i}`, isCorrect: false, displayOrder: 3 },
                { content: `Option D for Q${i}`, isCorrect: false, displayOrder: 4 },
              ],
            },
          },
        },
      },
      include: {
        revisions: true,
      },
    });

    // Update currentRevisionId to point to the created revision
    await prisma.question.update({
      where: { id: q.id },
      data: { currentRevisionId: q.revisions[0].id },
    });

    questions.push(q);
  }

  // 5. Generate 5 Competitions
  console.log("Generating 5 Competitions...");
  const comps = [];
  for (let i = 1; i <= 5; i++) {
    const comp = await prisma.challenge.create({
      data: {
        title: `Mega Competition 2026 - Phase ${i}`,
        slug: `mega-competition-${i}`,
        description: `Comprehensive evaluation phase ${i}.`,
        category: "SSC",
        difficulty: "MEDIUM",
        durationInMinutes: 60,
        totalQuestions: 10,
        status: i === 1 ? "ENDED" : "LIVE",
        createdById: adminUser.id,
      },
    });

    // Attach 10 questions to each
    const compQuestions = questions.slice((i - 1) * 10, i * 10);
    await Promise.all(
      compQuestions.map((q, idx) =>
        prisma.challengeQuestion.create({
          data: { challengeId: comp.id, questionId: q.id, orderIndex: idx },
        })
      )
    );
    comps.push(comp);
  }

  // 6. Generate Leaderboard & Results for Ended Competition (Beta Cohort)
  console.log("Generating Leaderboard & Certificates for Beta Cohort...");
  const endedComp = comps[0];

  await Promise.all(
    betaTesters.map(async (tester, index) => {
      // Randomized score based on beta tester index to create varied leaderboard
      const score = Math.max(0, 100 - index * 5); // 100, 95, 90, ...
      const correctAnswers = Math.floor(score / 10);
      const wrongAnswers = 10 - correctAnswers;
      const timeTaken = 1200 + index * 60; // Slightly slower times

      // Create Attempt
      const attempt = await prisma.attempt.create({
        data: {
          userId: tester.id,
          challengeId: endedComp.id,
          status: "EVALUATED",
          score,
          totalAnswered: 10,
          correctAnswers,
          wrongAnswers,
          timeTakenInSeconds: timeTaken,
          startedAt: new Date(Date.now() - 3600000), // 1 hour ago
          submittedAt: new Date(),
        },
      });

      // Create Leaderboard Entry
      await prisma.leaderboardEntry.create({
        data: {
          challengeId: endedComp.id,
          userId: tester.id,
          attemptId: attempt.id,
          score,
          rank: index + 1,
          accuracy: correctAnswers * 10,
          timeTakenInSeconds: timeTaken,
        },
      });

      // Create Certificate for Top 3
      if (index < 3) {
        await prisma.certificateSnapshot.create({
          data: {
            userId: tester.id,
            competitionId: endedComp.id,
            certificateType: "WINNER",
            certificateVersion: "1.0",
            issueDate: new Date(),
            verificationToken: randomUUID(),
            participantName: tester.name || "Beta Tester",
            competitionName: endedComp.title,
            competitionVersion: "1.0",
            rank: index + 1,
            score,
            completionDate: new Date(),
            qrPayload: `beta-payload-${tester.id}`,
            brandAssetsVersion: "1.0",
          },
        });
      }
    })
  );

  console.log("Robust seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
