import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";
import { Button } from "@/components/primitives/Button";

export default function RefundsPage() {
  const refunds = [
    {
      id: "rfd_123",
      revenueTxId: "tx_123",
      razorpayRefundId: "rf_abc123",
      amount: 1500,
      reason: "Duplicate Payment",
      status: "PROCESSED",
      createdAt: "2023-10-28T14:30:00Z",
    },
    {
      id: "rfd_124",
      revenueTxId: "tx_124",
      razorpayRefundId: null,
      amount: 500,
      reason: "Customer Request",
      status: "PENDING",
      createdAt: "2023-10-29T09:00:00Z",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Refunds Management</h1>
        <Button>Initiate Manual Refund</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Refund Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell className="font-mono text-xs">{refund.id}</TableCell>
                  <TableCell className="font-mono text-xs">{refund.revenueTxId}</TableCell>
                  <TableCell>₹{refund.amount}</TableCell>
                  <TableCell>{refund.reason}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        refund.status === "PROCESSED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {refund.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(refund.createdAt).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {refund.status === "PENDING" && (
                      <Button variant="outline" size="sm">
                        Approve
                      </Button>
                    )}
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
