"use client";

import { Box } from "@/components/ui/RadixTheme";
import AccountSettings from "@/components/account/AccountSettings";
import UserProfile from "@/components/user-profile";
import UserBookmarks from "@/components/account/UserBookmarks";
import { Flex, Spinner } from "@radix-ui/themes";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const session = authClient.useSession();
  
  if (!session.data && !session.isPending) {
    redirect("/login");
  }

  return (
    <Box className="container mx-auto p-4 pt-8">
      <AccountSettings>
        <Flex direction="column" gap="6">
          {session.isPending ? (
            <Flex justify="center" p="6">
              <Spinner size="3" />
            </Flex>
          ) : (
            session.data?.user && <UserProfile user={session.data.user} />
          )}
          <UserBookmarks />
        </Flex>
      </AccountSettings>
    </Box>
  );
}
