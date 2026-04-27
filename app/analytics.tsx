"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import * as gtag from "../lib/gtag";

export default function Analytics() {
 const pathname = usePathname();

 useEffect(() => {
  if (!gtag.GA_TRACKING_ID) return;
  if (typeof window === "undefined") return;
  const gtagWindow = window as Window & {
   gtag?: (...args: unknown[]) => void;
  };
  if (typeof gtagWindow.gtag !== "function") return;

    const url = window.location.pathname + window.location.search;

  gtag.pageview(url);
 }, [pathname]);

 return null;
}