import { Flex } from "@radix-ui/themes";
import type { ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" className="min-h-screen">
      {children}
    </Flex>
  );
};
