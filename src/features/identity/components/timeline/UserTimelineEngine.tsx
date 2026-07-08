import React from "react";
import { IdentityEventStore } from "../../events/IdentityEventStore";

export const UserTimelineEngine = ({ identityId }: { identityId: string }) => {
  const events = IdentityEventStore.getEventsForIdentity(identityId);

  if (events.length === 0) {
    return <div className="text-gray-500 text-sm">No timeline events found.</div>;
  }

  return (
    <div className="relative border-l border-gray-700 ml-3 space-y-6">
      {events.map((event, index) => (
        <div key={event.id} className="pl-6 relative">
          <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[6.5px] top-1.5 border-2 border-gray-900" />
          <div className="text-sm font-medium text-white">{event.type}</div>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(event.timestamp).toLocaleString()}
          </div>
          <pre className="mt-2 text-xs text-gray-400 bg-gray-900 p-2 rounded">
            {JSON.stringify(event.payload, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
};
