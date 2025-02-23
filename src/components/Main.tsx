import { Flex } from "@radix-ui/themes";
import type { ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" className="min-h-screen bg-linear-to-b from-green-10 to-green-12">
      {children}
    </Flex>
  );
};
