import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Theme, ThemePanel } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Bookmark Organizer",
  description: "Bookmark Organizer",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-gradient-to-b from-[#2e026d] to-[#15162c]`}
    >
      <body>
        <Theme>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
