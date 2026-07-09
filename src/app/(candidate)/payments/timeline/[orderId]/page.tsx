import { PaymentTimelineReadModel } from "@/features/revenue/models/read-models/RevenueReadModels";

interface TimelinePageProps {
  params: {
    orderId: string;
  };
}

// Mock ReadModel for demonstration
const getMockTimeline = (orderId: string): PaymentTimelineReadModel => ({
  orderId,
  competitionName: "SSC CGL Grand Mock 2026",
  amount: "499.00",
  currency: "INR",
  currentState: "ENROLLED",
  events: [
    {
      title: "Registration Started",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: "SUCCESS",
      description: "You initiated registration for the competition.",
    },
    {
      title: "Payment Started",
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      status: "SUCCESS",
      description: "Razorpay checkout opened.",
    },
    {
      title: "Payment Captured",
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      status: "SUCCESS",
      description: "Your payment was successfully received and verified.",
    },
    {
      title: "Enrolled",
      timestamp: new Date(Date.now() - 2900000).toISOString(),
      status: "SUCCESS",
      description: "You have been successfully enrolled in the competition.",
    },
  ],
});

export default function CandidatePaymentTimelinePage({ params }: TimelinePageProps) {
  // In a real application, fetch the strictly-typed ReadModel via API/trpc using params.orderId
  const timeline = getMockTimeline(params.orderId);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Payment Timeline</h1>
          <p className="mt-2 text-sm text-gray-500">
            Order ID: <span className="font-mono text-gray-700">{timeline.orderId}</span>
          </p>

          <div className="mt-6 bg-slate-50 p-4 rounded-md border border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Competition</p>
              <p className="font-semibold text-gray-900">{timeline.competitionName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="font-bold text-lg text-gray-900">
                {timeline.currency} {timeline.amount}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {timeline.events.map((event, eventIdx) => (
                <li key={eventIdx}>
                  <div className="relative pb-8">
                    {eventIdx !== timeline.events.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${event.status === "SUCCESS" ? "bg-green-500" : event.status === "FAILED" ? "bg-red-500" : "bg-gray-300"}`}
                        >
                          {event.status === "SUCCESS" && (
                            <svg
                              className="h-5 w-5 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {/* Add failure/pending icons if needed */}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          {event.description && (
                            <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                          )}
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time dateTime={event.timestamp}>
                            {new Date(event.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </time>
                          <p className="text-xs mt-1">
                            {new Date(event.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-500">Current State:</span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {timeline.currentState}
          </span>
        </div>
      </div>
    </div>
  );
}
