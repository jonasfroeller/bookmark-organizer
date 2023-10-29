import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@radix-ui/react-toolbar";

export function LogInButton() {
  const { data: sessionData } = useSession();

  return (
    <Button
      className="bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </Button>
  );
}
