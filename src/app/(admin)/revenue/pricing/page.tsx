import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingPage() {
  const policies = [
    {
      id: 'pol_1',
      competition: 'Grand National Qualifier',
      version: 3,
      type: 'PAID',
      baseFee: 1500,
      activeRegistrations: 450,
      totalRevenue: 675000
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Pricing Policies</h1>
        <Button>New Pricing Policy</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Competition Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competition</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Base Fee</TableHead>
                <TableHead>Active Registrations</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead className="text-right">History</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-semibold">{policy.competition}</TableCell>
                  <TableCell>v{policy.version}</TableCell>
                  <TableCell>{policy.type}</TableCell>
                  <TableCell>₹{policy.baseFee}</TableCell>
                  <TableCell>{policy.activeRegistrations}</TableCell>
                  <TableCell>₹{policy.totalRevenue}</TableCell>
                  <TableCell className="text-right">
                    <Link href="/revenue/pricing/history">
                      <Button variant="outline" size="sm">View History</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
