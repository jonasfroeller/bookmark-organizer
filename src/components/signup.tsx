"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { signinGithub } from "@/lib/social-login";
import { Button, TextField, Text, Box } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: undefined,
      },
      {
        onSuccess: () => {
          setLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
        onResponse: () => {
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center">
      <div className="z-10 mx-auto w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <Text size="6" weight="bold" className="tracking-tighter">
            Create an account
          </Text><br></br>
          <Text size="2">
            Get started with your free account
          </Text>
        </div>
        <form className="space-y-4">
          <Box className="space-y-2">
            <Text as="label" size="2" weight="medium">
              Name
            </Text>
            <TextField.Root
                type="text"
                required
                onChange={(e) => setName(e.target.value)}>
            </TextField.Root>
          </Box>

          <Box className="space-y-2">
            <Text as="label" size="2" weight="medium">
              Email address
            </Text>
            <TextField.Root
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
            />
          </Box>

          <Box className="space-y-2">
            <Text as="label" size="2" weight="medium">
              Password
            </Text>
            <TextField.Root
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
            />
          </Box>

          <Button onClick={signUp} className="w-full" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Text size="2">
            Already have an account?{" "}
            <Link href="/login">
              Sign In
            </Link>
          </Text>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <Button onClick={signinGithub} className="w-full">
            <GitHubLogoIcon className="h-4 w-4" />
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
