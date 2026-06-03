import { Trophy, Flame } from "lucide-react";

export function UserStatsSkeleton() {
  return (
    <div className="flex items-center gap-1.5 mt-1 overflow-hidden">
      <span className="flex items-center whitespace-nowrap gap-1 px-1.5 py-0.5 bg-orange-50 text-orange-600/50 rounded text-[10px] font-bold border border-orange-100 animate-pulse">
        <Flame className="w-3 h-3 shrink-0 text-orange-400/50" /> --- Streak
      </span>
      <span className="flex items-center whitespace-nowrap gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600/50 rounded text-[10px] font-bold border border-blue-100 truncate animate-pulse">
        <Trophy className="w-3 h-3 shrink-0 text-blue-400/50" /> Unranked
      </span>
    </div>
  );
}
