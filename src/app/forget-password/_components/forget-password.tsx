"use client";
import { authClient } from "@/lib/auth-client";
import { Button, TextField, Text, Box, Card, Heading, Flex, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import Link from "next/link";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const forgetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
      fetchOptions: {
        onSuccess: () => {
          setSubmitted(true);
          setLoading(false);
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setLoading(false);
        },
      },
    });
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: "100dvh" }}>
      <Card size="3" style={{ width: "100%", maxWidth: "450px" }}>
        <Flex direction="column" gap="5">
          <Box style={{ textAlign: "center" }}>
            <Heading size="6" mb="1" className="tracking-tighter">Forgot Password</Heading>
            <Text size="2" color="gray">Enter your email to receive a reset link</Text>
          </Box>
          
          {submitted ? (
            <Flex direction="column" gap="4" align="center">
              <Box style={{ textAlign: "center" }} mt="4">
                <Text size="3" weight="medium">Email Sent!</Text>
                <Text size="2" color="gray" mt="2">
                  Check your inbox for instructions to reset your password.
                </Text>
              </Box>
              <Link href="/login">
                <Button size="2" variant="soft">Return to Login</Button>
              </Link>
            </Flex>
          ) : (
            <form className="space-y-4" onSubmit={forgetPassword}>
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
              
              <Button type="submit" size="3" className="w-full" disabled={loading || email.length === 0}>
                {loading ? <Flex align="center" gap="2"><Spinner /> Sending Reset Link...</Flex> : "Reset Password"}
              </Button>
              
              <Flex justify="center" mt="2">
                <Text size="2">
                  Remember your password?{" "}
                  <Link href="/login">
                    <Text size="2" color="blue">Sign In</Text>
                  </Link>
                </Text>
              </Flex>
            </form>
          )}
        </Flex>
      </Card>
    </Flex>
  );
}
