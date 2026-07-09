import React from "react";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/icons";

export function ButtonShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <h3 className="w-full text-sm font-medium text-muted-foreground">Variants</h3>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
        <Button variant="link">Link</Button>
        <Button variant="text">Text</Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <h3 className="w-full text-sm font-medium text-muted-foreground">
          Lifecycle States & Sizes
        </h3>
        <Button state="loading">Loading</Button>
        <Button state="success">Success</Button>
        <Button state="disabled">Disabled</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button variant="outline" size="icon">
          <Icon name="Settings" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
