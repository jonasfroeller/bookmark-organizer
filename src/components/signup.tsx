"use client";

import Link from "next/link";
import { type SVGProps, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { signinGithub } from "@/lib/social-login";
import { Button, TextField, Text, Box } from "@radix-ui/themes";

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
            <Link href="/login" className="text-olive-8 hover:text-olive-7">
              Sign In
            </Link>
          </Text>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <Button onClick={signinGithub} className="w-full">
            <GithubIcon className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
