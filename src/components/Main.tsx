import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" className="min-h-screen bg-[#236162]">
      {children}
    </Flex>
  );
};
