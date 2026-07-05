"use client";

import { useState } from "react";
import { useWizardStore } from "../context/useWizardStore";
import { publishCompetitionAction } from "@/competitions/actions/publish.actions";
import { PublishMetadata } from "@/competitions/services/CompetitionPublishService";
import { Loader2, Share2, Globe, CheckCircle2, Copy } from "lucide-react";
import toast from "react-hot-toast";

export function CompetitionPublishStep() {
  const { currentStep, setStep, draftData, sessionId } = useWizardStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const [metadata, setMetadata] = useState<PublishMetadata | null>(null);

  const handlePublish = async () => {
    const slug = draftData.basics.slug || `draft-${sessionId}`;
    setIsPublishing(true);
    
    try {
      const res = await publishCompetitionAction(slug);
      if (res.success && res.data) {
        setMetadata(res.data);
        toast.success("Competition published successfully!");
      } else {
        toast.error(res.error || "Failed to publish competition.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred during publishing.");
    } finally {
      setIsPublishing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (metadata) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-10">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-navy">Competition is Live!</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Your competition has been successfully indexed in the Discovery system and is ready for candidates.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-w-md mx-auto mt-8">
          <label className="block text-sm font-semibold text-gray-700 text-left mb-2">Shareable Link</label>
          <div className="flex">
            <input 
              readOnly 
              value={metadata.shareableLink} 
              className="flex-1 bg-white border border-gray-300 rounded-l-lg px-3 py-2 text-sm text-gray-600 outline-none"
            />
            <button 
              onClick={() => copyToClipboard(metadata.shareableLink)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg flex items-center gap-2 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>

        <div className="pt-8">
          <button
            onClick={() => window.location.href = '/admin/dashboard/competitions'}
            className="px-8 py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy-light transition-colors"
          >
            Go to Competitions Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-navy flex items-center gap-2">
          <Share2 className="w-6 h-6 text-green-600" />
          Publish Competition
        </h2>
        <p className="text-gray-500 mt-2">Deploy your competition to the runtime environment.</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex gap-4">
          <Globe className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <h3 className="font-bold text-navy mb-1">Final Step: Deployment</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Your competition will be indexed for Discovery (if Public).</li>
              <li>A shareable link will be generated for direct invites.</li>
              <li>Candidates will be able to join immediately or wait for the start time.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100">
        <button
          type="button"
          onClick={() => setStep(7)}
          className="px-6 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handlePublish}
          disabled={isPublishing}
          className="flex items-center gap-2 px-8 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {isPublishing && <Loader2 className="w-4 h-4 animate-spin" />}
          Publish Now
        </button>
      </div>
    </div>
  );
}
