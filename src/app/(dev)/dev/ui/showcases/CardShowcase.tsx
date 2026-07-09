import React from "react";
import {
  Card,
  CardHeader,
  CardToolbar,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";

export function CardShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard composition</CardDescription>
        </CardHeader>
        <CardToolbar>
          <Button size="sm" variant="outline">
            Filter
          </Button>
          <Button size="sm" variant="outline">
            Sort
          </Button>
        </CardToolbar>
        <CardContent>
          <p className="text-sm">
            Card content goes here. This is the default state with a Toolbar.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Action
          </Button>
        </CardFooter>
      </Card>

      <Card state="hover">
        <CardHeader>
          <CardTitle>Hover State</CardTitle>
          <CardDescription>Interactive card</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Hovering over this card elevates it slightly.</p>
        </CardContent>
      </Card>

      <Card state="selected">
        <CardHeader>
          <CardTitle>Selected State</CardTitle>
          <CardDescription>For selectable grids</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Visual feedback for selected items.</p>
        </CardContent>
      </Card>

      <Card state="loading">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
        </CardContent>
      </Card>

      <Card state="error">
        <CardHeader>
          <CardTitle className="text-destructive">Error Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Failed to load data.</p>
        </CardContent>
      </Card>
    </div>
  );
}
