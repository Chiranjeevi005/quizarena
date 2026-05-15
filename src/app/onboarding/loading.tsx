export default function OnboardingLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
      <p className="text-navy/60 font-medium animate-pulse">Initializing Setup...</p>
    </div>
  );
}
