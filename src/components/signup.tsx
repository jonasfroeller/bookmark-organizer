"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { signinGithub } from "@/lib/social-login";
import { Button, TextField, Text, Box, Card, Heading, Flex, Separator, Spinner } from "@radix-ui/themes";
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
    <Flex justify="center" align="center" style={{ minHeight: "100dvh" }}>
      <Card size="3" style={{ width: "100%", maxWidth: "450px" }}>
        <Flex direction="column" gap="5">
          <Box style={{ textAlign: "center" }}>
            <Heading size="6" mb="1" className="tracking-tighter">Create an account</Heading>
            <Text size="2" color="gray">Get started with your free account</Text>
          </Box>
          
          <form className="space-y-4" onSubmit={signUp}>
            <Box className="space-y-2">
              <Text as="label" size="2" weight="medium">
                Name
              </Text>
              <TextField.Root
                type="text"
                required
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

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
                autoComplete="new-password"
              />
            </Box>

            <Button type="submit" size="3" className="w-full" disabled={loading}>
              {loading ? <Flex align="center" gap="2"><Spinner /> Signing Up...</Flex> : "Sign Up"}
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
              Already have an account?{" "}
              <Link href="/login">
                <Text size="2" color="blue">Sign In</Text>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
