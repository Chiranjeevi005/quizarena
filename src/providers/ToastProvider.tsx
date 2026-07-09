"use client";

import React, { createContext, useContext, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/utilities";
import { ProviderRegistry } from "@/registry";

export interface ToastOptions {
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning";
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);

  const toast = (options: ToastOptions) => {
    setToasts((prev) => [...prev, { ...options, id: Math.random().toString(36).substr(2, 9) }]);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map(({ id, title, description, action, variant = "default" }) => (
          <ToastPrimitive.Root
            key={id}
            className={cn(
              "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md rounded-xl p-4 grid gap-1",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full"
            )}
          >
            <div className="flex justify-between items-start">
              <div>
                <ToastPrimitive.Title className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {title}
                </ToastPrimitive.Title>
                {description && (
                  <ToastPrimitive.Description className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {description}
                  </ToastPrimitive.Description>
                )}
              </div>
              <ToastPrimitive.Close className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                <span className="sr-only">Close</span>
                &times;
              </ToastPrimitive.Close>
            </div>
            {action && (
              <ToastPrimitive.Action altText="Toast action" asChild>
                {action}
              </ToastPrimitive.Action>
            )}
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed top-0 right-0 p-6 flex flex-col gap-2 w-[390px] max-w-[100vw] z-[1700] m-0 list-none outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

ProviderRegistry.register({
  id: "toast-provider",
  name: "ToastProvider",
  description: "Global provider for Toast notifications.",
});
