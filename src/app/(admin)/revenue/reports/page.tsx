import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";
import { Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Revenue Reports</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Export a detailed CSV of all transactions captured today.
            </p>
            <Button className="w-full flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Reconciliation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Comprehensive monthly summary including refunds, platform fees, and net revenue.
            </p>
            <Button className="w-full flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GST & Tax Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tax-specific report formatted for easy upload to GST portals.
            </p>
            <Button className="w-full flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
