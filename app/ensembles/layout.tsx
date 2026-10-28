import type { ReactNode } from "react";
import { EnsembleTransitionProvider } from "../../components/ensemble-transition-context";

export default function EnsemblesLayout({ children }: { children: ReactNode }) {
 return <EnsembleTransitionProvider>{children}</EnsembleTransitionProvider>;
}
