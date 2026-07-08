import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function PricingHistoryPage() {
  const versions = [
    { version: 3, type: 'PAID', baseFee: 1500, active: true, createdAt: '2023-10-01' },
    { version: 2, type: 'PAID', baseFee: 1200, active: false, createdAt: '2023-08-15' },
    { version: 1, type: 'FREE', baseFee: 0, active: false, createdAt: '2023-01-10' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Pricing History: Grand National Qualifier</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Version</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Base Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((v) => (
                <TableRow key={v.version}>
                  <TableCell className="font-semibold">v{v.version}</TableCell>
                  <TableCell>{v.type}</TableCell>
                  <TableCell>₹{v.baseFee}</TableCell>
                  <TableCell>
                    {v.active ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">Archived</span>
                    )}
                  </TableCell>
                  <TableCell>{v.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
