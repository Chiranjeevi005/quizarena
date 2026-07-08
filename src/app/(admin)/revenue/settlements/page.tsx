import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function SettlementsPage() {
  const settlements = [
    {
      id: 'stl_123',
      razorpaySettlementId: 'setl_abc123',
      status: 'processed',
      amount: 1400,
      fees: 18,
      tax: 3.24,
      utr: 'UTR123456789',
      settledAt: '2023-10-29T10:00:00Z'
    },
    {
      id: 'stl_124',
      razorpaySettlementId: 'setl_def456',
      status: 'created',
      amount: 500,
      fees: 0,
      tax: 0,
      utr: null,
      settledAt: null
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Razorpay Settlements</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Sync Now
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settlement Records (Read-Only)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Settlement ID</TableHead>
                <TableHead>Razorpay ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Fees & Tax</TableHead>
                <TableHead>UTR</TableHead>
                <TableHead>Settled At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {settlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell className="font-mono text-xs">{settlement.id}</TableCell>
                  <TableCell className="font-mono text-xs">{settlement.razorpaySettlementId}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      settlement.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {settlement.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>₹{settlement.amount}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    F: ₹{settlement.fees} | T: ₹{settlement.tax}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{settlement.utr || '-'}</TableCell>
                  <TableCell>{settlement.settledAt ? new Date(settlement.settledAt).toLocaleDateString() : '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
