import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/router";

export function LogInButton() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <Button
      className="px-10 py-3 font-semibold"
      onClick={sessionData ? () => void signOut() : () => router.push("/login")}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </Button>
  );
}
