"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, Button, Flex, Text } from "@radix-ui/themes";

type UserProps = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | undefined | null;
};

export default function UserProfile({ user }: { user: UserProps }) {
  const router = useRouter();
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    });
  };

  return (
    <Flex align="center" gap="4">
      <Flex align="center" gap="3">
        {user.image ? (
          <Avatar
            size="3"
            src={user.image}
            fallback={user.name?.[0] ?? "U"}
            radius="full"
          />
        ) : (
          <Avatar
            size="3"
            fallback={user.name?.[0] ?? "U"}
            radius="full"
          />
        )}
        <Flex direction="column" gap="1">
          <Text weight="medium">{user.name}</Text>
          <Text size="2" color="gray">{user.email}</Text>
        </Flex>
      </Flex>
      <Button onClick={signOut} size="2">
        Sign out
      </Button>
    </Flex>
  );
}
