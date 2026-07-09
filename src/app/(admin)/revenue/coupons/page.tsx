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

export default function CouponsPage() {
  const coupons = [
    {
      id: "coupon_1",
      code: "WELCOME50",
      type: "PERCENTAGE",
      value: 50,
      state: "ACTIVE",
      usage: "12 / 100",
      expiresAt: "2023-12-31T23:59:59Z",
    },
    {
      id: "coupon_2",
      code: "FLAT200",
      type: "FIXED",
      value: 200,
      state: "EXPIRED",
      usage: "500 / 500",
      expiresAt: "2023-10-01T23:59:59Z",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Coupons Engine</h1>
        <Button>Create Coupon</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active & Historical Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-bold">{coupon.code}</TableCell>
                  <TableCell>{coupon.type}</TableCell>
                  <TableCell>
                    {coupon.type === "PERCENTAGE" ? `${coupon.value}%` : `₹${coupon.value}`}
                  </TableCell>
                  <TableCell>{coupon.usage}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        coupon.state === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {coupon.state}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(coupon.expiresAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
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
