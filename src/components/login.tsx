"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signinGithub } from "@/lib/social-login";
import { authClient } from "@/lib/auth-client";
import { Button, TextField, Checkbox, Flex, Text, Box, Card, Heading, Separator, Spinner } from "@radix-ui/themes";
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
    <Flex justify="center" align="center" style={{ minHeight: "100dvh" }}>
      <Card size="3" style={{ width: "100%", maxWidth: "450px" }}>
        <Flex direction="column" gap="5">
          <Box style={{ textAlign: "center" }}>
            <Heading size="6" mb="1" className="tracking-tighter">Welcome back</Heading>
            <Text size="2" color="gray">Sign in to your account to continue</Text>
          </Box>
          
          <form className="space-y-4" onSubmit={signIn}>
            <Box className="space-y-2">
              <Text as="label" size="2" weight="medium">
                Email address
              </Text>
              <TextField.Root
                type="email"
                required
                placeholder="you@example.com"
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
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Box>
            
            <Flex justify="between" align="center">
              <Flex gap="2" align="center">
                <Checkbox checked={remember} onCheckedChange={(checked) => setRemember(!!checked)} />
                <Text size="2">Remember me</Text>
              </Flex>
              <Link href="/forget-password">
                <Text size="2" color="blue">Forgot password?</Text>
              </Link>
            </Flex>
            
            <Button type="submit" size="3" className="w-full" disabled={loading}>
              {loading ? <Flex align="center" gap="2"><Spinner /> Signing In...</Flex> : "Sign In"}
            </Button>
          </form>

          <Flex align="center" gap="4">
            <Separator size="4" style={{ flexGrow: 1 }} />
            <Text size="1" color="gray">OR</Text>
            <Separator size="4" style={{ flexGrow: 1 }} />
          </Flex>

          <Button onClick={signinGithub} size="3" variant="outline" className="w-full">
            <Flex align="center" gap="2">
              <GitHubLogoIcon />
              Sign in with GitHub
            </Flex>
          </Button>

          <Flex justify="center" mt="2">
            <Text size="2">
              Don&apos;t have an account?{" "}
              <Link href="/signup">
                <Text size="2" color="blue">Sign up</Text>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
