"use client";
import { authClient } from "@/lib/auth-client";
import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const forgetPassword = async () => {
    setLoading(true);
    await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
      fetchOptions: {
        onSuccess: () => {
          alert("We have sent you an email for an instructions.");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
        onResponse: () => {
          setLoading(false);
        },
      },
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-[500px] flex-col gap-4 text-white">
        <div className="mb-8 text-white">
          <h1 className="font-geist text-3xl font-normal tracking-tighter">
            Forget Password
          </h1>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-white"
          >
            Email address
          </label>
          <TextField.Root
            id="email"
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <Button
          disabled={email.length === 0}
          onClick={forgetPassword}
        >
          {loading ? (
            <span className="relative">Forgetting password...</span>
          ) : (
            <span className="relative">Forget Password</span>
          )}
        </Button>
      </div>
    </div>
  );
}
