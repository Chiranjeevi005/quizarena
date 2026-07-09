import React from "react";
import { PrimitiveRegistry, PrimitiveManifest } from "@/registry/PrimitiveRegistry";

// Import showcases
import { ButtonShowcase } from "./showcases/ButtonShowcase";
import { CardShowcase } from "./showcases/CardShowcase";
import { InputShowcase } from "./showcases/InputShowcase";

const showcases: Record<string, React.ReactNode> = {
  "primitive-button": <ButtonShowcase />,
  "primitive-card": <CardShowcase />,
  "primitive-input": <InputShowcase />,
};

const CATEGORIES = [
  "Typography",
  "Buttons",
  "Inputs",
  "Feedback",
  "Loading",
  "Indicators",
  "Layout",
  "Navigation",
  "Other",
];

const getCategory = (name: string): string => {
  switch (name) {
    case "Typography":
      return "Typography";
    case "Button":
      return "Buttons";
    case "Input":
      return "Inputs";
    case "Tooltip":
    case "Progress":
      return "Feedback";
    case "Spinner":
    case "Skeleton":
      return "Loading";
    case "Badge":
    case "Tag":
    case "Avatar":
    case "Chip":
    case "Pill":
    case "StatusDot":
    case "Kbd":
      return "Indicators";
    case "Card":
    case "Surface":
    case "ScrollArea":
    case "AspectRatio":
    case "Divider":
      return "Layout";
    default:
      return "Other";
  }
};

export default function UIDevPage() {
  const primitives = PrimitiveRegistry.getAll();

  const groupedPrimitives = primitives.reduce(
    (acc, manifest) => {
      const category = getCategory(manifest.name);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(manifest);
      return acc;
    },
    {} as Record<string, PrimitiveManifest[]>
  );

  return (
    <div className="p-8 space-y-16 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">UI Primitives Playground</h1>
        <p className="text-muted-foreground">
          Auto-generated manual inspection environment for the Enterprise Component Library.
        </p>
      </div>

      {primitives.length === 0 && (
        <p className="text-muted-foreground">No primitives registered in PrimitiveRegistry.</p>
      )}

      {CATEGORIES.map((category) => {
        const categoryPrimitives = groupedPrimitives[category];
        if (!categoryPrimitives || categoryPrimitives.length === 0) return null;

        return (
          <div key={category} className="space-y-8">
            <h2 className="text-2xl font-bold border-b pb-2">{category}</h2>

            {categoryPrimitives.map((manifest) => (
              <section key={manifest.id} className="space-y-6 border rounded-xl p-6 bg-card">
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold flex items-center gap-3">
                      {manifest.name}
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        v{manifest.registryVersion || manifest.version}
                      </span>
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full capitalize">
                        {manifest.status}
                      </span>
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{manifest.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <strong className="block mb-1 text-foreground">Tokens:</strong>
                      <div className="flex flex-wrap gap-1">
                        {manifest.tokens.map((t) => (
                          <span
                            key={t}
                            className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                        {manifest.tokens.length === 0 && (
                          <span className="text-muted-foreground italic">None</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <strong className="block mb-1 text-foreground">Accessibility:</strong>
                      <div className="flex flex-wrap gap-1">
                        {manifest.accessibility.map((a) => (
                          <span
                            key={a}
                            className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded"
                          >
                            {a}
                          </span>
                        ))}
                        {manifest.accessibility.length === 0 && (
                          <span className="text-muted-foreground italic">None</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <strong className="block mb-1 text-foreground">Dependencies:</strong>
                      <div className="flex flex-wrap gap-1">
                        {manifest.dependencies.map((d) => (
                          <span
                            key={d}
                            className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded"
                          >
                            {d}
                          </span>
                        ))}
                        {manifest.dependencies.length === 0 && (
                          <span className="text-muted-foreground italic">None</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <strong className="block mb-1 text-foreground">Behavior:</strong>
                      <div className="flex flex-wrap gap-1">
                        {manifest.responsive && (
                          <span className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
                            Responsive
                          </span>
                        )}
                        {manifest.motion?.map((m) => (
                          <span
                            key={m}
                            className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded"
                          >
                            Motion: {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-4">Showcase</h4>
                  {showcases[manifest.id] || (
                    <div className="p-8 border border-dashed rounded-lg flex items-center justify-center text-muted-foreground">
                      No interactive showcase provided for {manifest.name} yet.
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        );
      })}
    </div>
  );
}
