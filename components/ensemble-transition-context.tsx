"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type EnsembleTransitionContextValue = {
 completeExit: () => void;
 navigate: (href: string) => void;
 phase: "idle" | "exiting";
};

const EnsembleTransitionContext = createContext<EnsembleTransitionContextValue | null>(null);

export function EnsembleTransitionProvider({ children }: { children: ReactNode }) {
 const router = useRouter();
 const [phase, setPhase] = useState<"idle" | "exiting">("idle");
 const [pendingHref, setPendingHref] = useState<string | null>(null);

 const navigate = (href: string) => {
  if (phase === "exiting") return;
  setPendingHref(href);
  setPhase("exiting");
 };

 const completeExit = () => {
  if (!pendingHref) return;
  const href = pendingHref;
  setPendingHref(null);
  setPhase("idle");
  router.push(href);
 };

 return (
  <EnsembleTransitionContext.Provider value={{ completeExit, navigate, phase }}>
   {children}
  </EnsembleTransitionContext.Provider>
 );
}

export function useEnsembleTransition() {
 const context = useContext(EnsembleTransitionContext);
 if (!context) throw new Error("useEnsembleTransition must be used within EnsembleTransitionProvider");
 return context;
}
