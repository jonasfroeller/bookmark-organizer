"use client";
import { authClient } from "@/lib/auth-client";
import { Button, TextField, Text, Box, Card, Heading, Flex, Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (password !== checkPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    await authClient.resetPassword({
      newPassword: password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
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
            <Heading size="6" mb="1" className="tracking-tighter">Reset Password</Heading>
            <Text size="2" color="gray">Create a new password for your account</Text>
          </Box>
          
          <form className="space-y-4" onSubmit={resetPassword}>
            <Box className="space-y-2">
              <Text as="label" size="2" weight="medium">
                New Password
              </Text>
              <TextField.Root
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Box>
            
            <Box className="space-y-2">
              <Text as="label" size="2" weight="medium">
                Confirm Password
              </Text>
              <TextField.Root
                type="password"
                required
                placeholder="••••••••"
                onChange={(e) => setCheckPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Box>
            
            {error && (
              <Text size="2" color="red" weight="medium">
                {error}
              </Text>
            )}
            
            <Button 
              type="submit" 
              size="3" 
              className="w-full" 
              disabled={loading || !password || !checkPassword}
            >
              {loading ? <Flex align="center" gap="2"><Spinner /> Resetting Password...</Flex> : "Reset Password"}
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
        </Flex>
      </Card>
    </Flex>
  );
}
