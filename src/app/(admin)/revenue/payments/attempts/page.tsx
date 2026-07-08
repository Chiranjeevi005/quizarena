import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PaymentAttemptsPage() {
  const attempts = [
    {
      id: 'attempt_1',
      orderId: 'order_def456',
      status: 'FAILED',
      amount: 1500,
      errorReason: 'Insufficient Funds',
      ipAddress: '192.168.1.1',
      country: 'IN',
      attemptCount: 1,
      createdAt: '2023-10-27T10:15:00Z'
    },
    {
      id: 'attempt_2',
      orderId: 'order_abc123',
      status: 'CAPTURED',
      amount: 1500,
      errorReason: null,
      ipAddress: '192.168.1.5',
      country: 'IN',
      attemptCount: 1,
      createdAt: '2023-10-27T10:05:00Z'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Payment Attempts & Fraud Signals</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Payment Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attempt ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Error Reason</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell className="font-mono text-xs">{attempt.id}</TableCell>
                  <TableCell className="font-mono text-xs">{attempt.orderId}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      attempt.status === 'CAPTURED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {attempt.status}
                    </span>
                  </TableCell>
                  <TableCell>₹{attempt.amount}</TableCell>
                  <TableCell className="text-red-500 max-w-[200px] truncate" title={attempt.errorReason || ''}>
                    {attempt.errorReason || '-'}
                  </TableCell>
                  <TableCell>{attempt.ipAddress}</TableCell>
                  <TableCell>{attempt.country}</TableCell>
                  <TableCell>{new Date(attempt.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
