import "@radix-ui/themes/styles.css";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";

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
      className={`${GeistSans.variable} bg-linear-to-b from-[#2e026d] to-[#15162c]`}
    >
      <body>
        <Theme accentColor="orange">
          <TRPCReactProvider>
            <Header />
            <Main>
              {children}
            </Main>
          </TRPCReactProvider>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
