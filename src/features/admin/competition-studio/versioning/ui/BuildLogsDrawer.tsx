"use client";

import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface BuildLogsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: { timestamp: string; stage: string; message: string; durationMs?: number }[];
  status: 'IDLE' | 'BUILDING' | 'SUCCESS' | 'FAILED';
  version?: string;
}

export function BuildLogsDrawer({ isOpen, onClose, logs, status, version }: BuildLogsDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="flex items-center gap-2">
                Version Build Logs
                {status === 'BUILDING' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                {status === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                {status === 'FAILED' && <AlertCircle className="w-4 h-4 text-red-500" />}
              </DrawerTitle>
              <DrawerDescription>
                {version ? `Artifact build pipeline for version ${version}` : 'Executing build pipeline...'}
              </DrawerDescription>
            </div>
            <Badge variant={status === 'SUCCESS' ? 'default' : status === 'FAILED' ? 'destructive' : 'secondary'}>
              {status}
            </Badge>
          </div>
        </DrawerHeader>

        <div className="p-4 bg-zinc-950 text-zinc-300 font-mono text-sm">
          <ScrollArea className="h-[400px] w-full rounded-md border border-zinc-800 p-4">
            {logs.length === 0 ? (
              <div className="flex items-center justify-center h-full text-zinc-600">
                Awaiting pipeline execution...
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 border-b border-zinc-800/50 pb-2">
                    <span className="text-zinc-500 shrink-0">
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>
                    <Badge variant="outline" className="shrink-0 w-fit">
                      {log.stage}
                    </Badge>
                    <span className="text-zinc-300 wrap-break-word flex-1">
                      {log.message}
                    </span>
                    {log.durationMs !== undefined && (
                      <span className="text-zinc-500 shrink-0 flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3" />
                        {log.durationMs}ms
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
