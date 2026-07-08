import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function RevenueAuditPage() {
  const auditLogs = [
    {
      id: 'log_1',
      action: 'PAYMENT_CAPTURED_AND_ENROLLED',
      actorId: 'system',
      targetId: 'tx_123',
      timestamp: '2023-10-27T10:06:00Z',
    },
    {
      id: 'log_2',
      action: 'REFUND_PROCESSED',
      actorId: 'admin_xyz',
      targetId: 'rfd_456',
      timestamp: '2023-10-28T14:30:00Z',
    }
  ];

  const webhookEvents = [
    {
      eventId: 'evt_abc',
      eventType: 'payment.captured',
      processed: true,
      retries: 0,
      timestamp: '2023-10-27T10:06:00Z'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Revenue Audit</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Events Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event ID</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Retries</TableHead>
                <TableHead>Received At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhookEvents.map((evt) => (
                <TableRow key={evt.eventId}>
                  <TableCell className="font-mono text-xs">{evt.eventId}</TableCell>
                  <TableCell>{evt.eventType}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      PROCESSED
                    </span>
                  </TableCell>
                  <TableCell>{evt.retries}</TableCell>
                  <TableCell>{new Date(evt.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Target ID</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-semibold">{log.action}</TableCell>
                  <TableCell>{log.actorId}</TableCell>
                  <TableCell className="font-mono text-xs">{log.targetId}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
