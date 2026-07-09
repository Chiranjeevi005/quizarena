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
import Link from "next/link";

export default function PaymentsPage() {
  const orders = [
    {
      id: "order_abc123",
      competition: "Grand National Qualifier",
      candidate: "John Doe",
      amount: 1500,
      status: "CAPTURED",
      createdAt: "2023-10-27T10:00:00Z",
    },
    {
      id: "order_def456",
      competition: "Grand National Qualifier",
      candidate: "Jane Smith",
      amount: 1500,
      status: "FAILED",
      createdAt: "2023-10-27T10:15:00Z",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Payment Orders</h1>
        <Link href="/revenue/payments/attempts">
          <Button variant="outline">View All Attempts</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Competition</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell>{order.competition}</TableCell>
                  <TableCell>{order.candidate}</TableCell>
                  <TableCell>₹{order.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "CAPTURED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
