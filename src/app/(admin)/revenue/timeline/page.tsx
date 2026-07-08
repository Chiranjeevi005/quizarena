import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function RevenueTimelinePage() {
  const events = [
    { id: 1, title: 'Order Generated', timestamp: '2023-10-27 10:00 AM', status: 'success' },
    { id: 2, title: 'Coupon Reserved', timestamp: '2023-10-27 10:01 AM', status: 'success' },
    { id: 3, title: 'Payment Attempted', timestamp: '2023-10-27 10:02 AM', status: 'warning', description: 'Failed: Insufficient Funds' },
    { id: 4, title: 'Payment Authorized', timestamp: '2023-10-27 10:05 AM', status: 'success' },
    { id: 5, title: 'Payment Captured', timestamp: '2023-10-27 10:06 AM', status: 'success' },
    { id: 6, title: 'Enrollment Completed', timestamp: '2023-10-27 10:06 AM', status: 'success' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Revenue Lifecycle Timeline</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Lifecycle for Order: order_abc123</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-muted ml-4 space-y-8 pb-4">
            {events.map((event, idx) => (
              <div key={event.id} className="relative pl-6">
                <div className="absolute -left-3.5 bg-background p-1 rounded-full">
                  {event.status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : event.status === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                  {event.description && (
                    <p className="text-sm text-red-400 mt-1">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
