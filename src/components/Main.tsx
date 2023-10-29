import { type ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return <main className="min-h-screen bg-[#236162]">{children}</main>;
};
