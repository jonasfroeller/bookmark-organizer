"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signinGithub } from "@/lib/social-login";
import { authClient } from "@/lib/auth-client";
import { Button, TextField, Checkbox, Flex, Text, Box } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: remember,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center">
      <div className="z-10 mx-auto w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <Text size="6" weight="bold" className="tracking-tighter">
            Welcome back
          </Text><br></br>
          <Text size="2">
            Sign in to your account to continue
          </Text>
        </div>
        <form className="space-y-4">
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
              autoComplete="current-password"
            />
          </Box>
          <Flex justify="between" align="center">
            <Flex gap="2" align="center">
              <Checkbox checked={remember} onCheckedChange={(checked) => setRemember(!!checked)} />
              <Text size="2">Remember me</Text>
            </Flex>
            <Link href="/forget-password" className="text-sm">
              Forgot password?
            </Link>
          </Flex>
          <Button onClick={signIn} className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Text size="2">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              Sign up
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
