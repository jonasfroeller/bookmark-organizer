"use client";

import Link from "next/link";
import { Box, Button, Flex, Heading } from "@/components/ui/RadixTheme";
import ThemeSwitcher from '@/components/ThemeSwitcher';

export function Header() {
  return (
    <Box className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Flex px="4" py="3" justify="between" align="center">
        <Heading as="h1" size="5">
          <Link href="/" className="font-bold">
            Bookmark Organizer
          </Link>
        </Heading>
        <Flex align="center" gap="4">
          <ThemeSwitcher />
          <Link href="/login">
            <Button size="2" color="amber" highContrast>
              Sign In
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
