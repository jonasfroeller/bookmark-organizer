"use client";

import Link from "next/link";
import { Box, Button, Flex, Heading } from "@/components/ui/RadixTheme";
import { SegmentedControl, Theme } from "@radix-ui/themes";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { GearIcon, PersonIcon, ExitIcon, DashboardIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const session = authClient.useSession();
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    if (pathname === "/settings") {
      setCurrentPage("settings");
    } else if (pathname === "/account") {
      setCurrentPage("account");
    } else if (pathname === "/") {
      setCurrentPage("dashboard");
    }
  }, [pathname]);

  const handleNavChange = (value: string) => {
    if (value === "logout") {
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          }
        }
      });
    } else {
      setCurrentPage(value);
      if (value === "dashboard") {
        router.push("/");
      } else {
        router.push(`/${value}`);
      }
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const isLoggedIn = !!session.data;

  return (
    <Box className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <Flex px="4" py="3" justify="between" align="center">
        <Heading as="h1" size="5">
          <Link href="/" className="font-bold">
            Bookmark Organizer
          </Link>
        </Heading>
        <Flex align="center" gap="4">
          <ThemeSwitcher />

          <Theme grayColor="mauve">
            {isLoggedIn ? (
              <Box>
                <SegmentedControl.Root
                  value={currentPage}
                  onValueChange={handleNavChange}
                  variant="surface"
                  radius="full"
                  size="2"
                >
                  <SegmentedControl.Item value="dashboard">
                    <DashboardIcon width="18" height="18" />
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="settings">
                    <GearIcon width="18" height="18" />
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="account">
                    <PersonIcon width="18" height="18" />
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="logout">
                    <ExitIcon width="18" height="18" />
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
              </Box>
            ) : (
              <Button
                onClick={handleLogin}
                size="2"
                color="teal"
                highContrast
                radius="full"
              >
                <Flex align="center" gap="2">
                  <span>LogIn</span>
                  <ExitIcon />
                </Flex>
              </Button>
            )}
          </Theme>
        </Flex>
      </Flex>
    </Box>
  );
}
