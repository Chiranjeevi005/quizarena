import { prisma } from "../../lib/prisma";
import Link from "next/link";
import { Calendar, Trophy, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Seasonal Tournaments | QuizArena",
  description: "Compete in high-stakes seasonal tournaments and climb the global rankings.",
};

export default async function TournamentsPage() {
  const activeSeasons = await prisma.season.findMany({
    where: { status: { in: ["ACTIVE", "UPCOMING"] } },
    include: {
      tournaments: {
        select: { id: true, status: true },
      },
    },
    orderBy: { startsAt: "asc" },
  });

  const archivedSeasons = await prisma.season.findMany({
    where: { status: "ARCHIVED" },
    orderBy: { endsAt: "desc" },
    take: 5,
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-[#0A1C40] mb-4 tracking-tight">
          Competitive Seasons
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Join high-stakes competitive seasons, conquer consecutive tournaments, and establish your
          dominance on the global leaderboard.
        </p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 border-b border-gray-200 pb-4">
          <Trophy className="text-blue-600 w-6 h-6" /> Active & Upcoming Seasons
        </h2>

        {activeSeasons.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center text-gray-500">
            No active seasons currently. Check back later for upcoming competitive events.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {activeSeasons.map((season) => (
              <Link
                key={season.id}
                href={`/tournaments/${season.slug}`}
                className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
                      season.status === "ACTIVE"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {season.status}
                  </span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {season.category || "General"}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {season.name}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {season.description ||
                    "Compete in this highly anticipated seasonal event to prove your expertise."}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 font-medium pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Ends {new Date(season.endsAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold">
                    {season.tournaments.length} Tournaments <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {archivedSeasons.length > 0 && (
        <div className="mt-16 space-y-6">
          <h2 className="text-xl font-bold text-gray-400 flex items-center gap-3">
            Past Seasons Archive
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {archivedSeasons.map((season) => (
              <div
                key={season.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-700">{season.name}</h3>
                <p className="text-xs font-medium text-gray-500 mt-2">
                  Ended {new Date(season.endsAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
