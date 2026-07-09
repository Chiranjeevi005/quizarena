import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/Card";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { Label } from "@/components/primitives/label";

export default function ConfigurationPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Revenue Configuration</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Razorpay Connection Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="font-semibold text-green-700">Connected (Test Mode)</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Secrets are securely managed via environment variables (.env).
          </p>
          <div className="text-sm">
            <p>
              <strong>Last Webhook Received:</strong> Just now
            </p>
            <p>
              <strong>Last Signature Verification:</strong> Success
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GST Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GST Percentage (%)</Label>
              <Input defaultValue="18.0" />
            </div>
            <div className="space-y-2">
              <Label>Invoice Prefix</Label>
              <Input defaultValue="QA-" />
            </div>
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input placeholder="Enter business name" />
            </div>
            <div className="space-y-2">
              <Label>GSTIN</Label>
              <Input placeholder="Enter GSTIN" />
            </div>
          </div>
          <Button>Save GST Configuration</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Payment Timeout (Minutes)</Label>
              <Input type="number" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <Label>Max Retry Count</Label>
              <Input type="number" defaultValue="3" />
            </div>
          </div>
          <Button>Save Policies</Button>
        </CardContent>
      </Card>
    </div>
  );
}
