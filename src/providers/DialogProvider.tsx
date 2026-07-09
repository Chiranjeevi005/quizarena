"use client";

import React, { createContext, useContext, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/utilities";
import { ProviderRegistry } from "@/registry";

export interface DialogOptions {
  title: string;
  description?: string;
  content: React.ReactNode;
}

interface DialogContextType {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogOptions | null>(null);

  const openDialog = (options: DialogOptions) => {
    setDialogContent(options);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setTimeout(() => setDialogContent(null), 200); // Wait for animation
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[1300] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[1400] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl">
            {dialogContent && (
              <>
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                  <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">
                    {dialogContent.title}
                  </DialogPrimitive.Title>
                  {dialogContent.description && (
                    <DialogPrimitive.Description className="text-sm text-slate-500 dark:text-slate-400">
                      {dialogContent.description}
                    </DialogPrimitive.Description>
                  )}
                </div>
                {dialogContent.content}
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none">
                  <span className="sr-only">Close</span>
                  <div className="h-4 w-4 flex items-center justify-center text-slate-500">
                    &times;
                  </div>
                </DialogPrimitive.Close>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used within DialogProvider");
  return context;
}

ProviderRegistry.register({
  id: "dialog-provider",
  name: "DialogProvider",
  description: "Global provider for Dialogs.",
});
