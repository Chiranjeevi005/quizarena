import {
  Season,
  Tournament,
  TournamentChallenge,
  TournamentLeaderboard,
  ExamCategory,
} from "../generated/prisma";

export type SeasonWithTournaments = Season & {
  tournaments: Tournament[];
};

export type TournamentWithDetails = Tournament & {
  challenges: TournamentChallengeWithChallenge[];
  leaderboard: TournamentLeaderboardWithUser[];
};

export type TournamentChallengeWithChallenge = TournamentChallenge & {
  challenge: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    difficulty: string;
    totalQuestions: number;
    durationInMinutes: number;
  };
};

export type TournamentLeaderboardWithUser = TournamentLeaderboard & {
  user: {
    id: string;
    name: string | null;
    image: string | null;
    username: string | null;
  };
};

export interface SeasonProgress {
  seasonId: string;
  seasonName: string;
  totalTournaments: number;
  completedTournaments: number;
  currentRank: number | null;
  totalScore: number;
  averageAccuracy: number;
}
