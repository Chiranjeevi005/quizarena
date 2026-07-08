import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TransactionsLedgerPage() {
  const transactions = [
    {
      id: 'tx_123',
      orderId: 'order_abc',
      amount: 1500,
      netAmount: 1400,
      status: 'CAPTURED',
      date: '2023-10-27T10:00:00Z'
    },
    {
      id: 'tx_124',
      orderId: 'order_def',
      amount: 500,
      netAmount: 480,
      status: 'CAPTURED',
      date: '2023-10-27T11:30:00Z'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Immutable Ledger</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Net Amount (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.orderId}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.netAmount}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
