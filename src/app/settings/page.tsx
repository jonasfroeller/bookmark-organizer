"use client";

import { Box } from "@/components/ui/RadixTheme";
import AccountSettings from "@/components/account/AccountSettings";
import ThemeSettings from "@/components/account/ThemeSettings";

export default function SettingsPage() {
  return (
    <Box className="container mx-auto p-4 pt-8">
      <AccountSettings>
        <ThemeSettings />
      </AccountSettings>
    </Box>
  );
}
