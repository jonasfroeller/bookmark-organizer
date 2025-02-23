"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const resetPassword = async () => {
    setLoading(true);
    if (password === checkPassword) {
      await authClient.resetPassword({
        newPassword: password,
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
          onError: (ctx) => {
            alert(ctx.error.message);
          },
          onResponse: () => {
            setLoading(false);
          },
        },
      });
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-full max-w-[500px] flex-col gap-4">
        <div className="mb-8">
          <h1 className="font-geist text-3xl font-normal tracking-tighter">
            Reset Password
          </h1>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm:text-sm/6"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium"
          >
            Confirm Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={(e) => setCheckPassword(e.target.value)}
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm:text-sm/6"
          />
        </div>
        <Button
          disabled={password !== checkPassword}
          onClick={resetPassword}
        >
          {loading ? (
            <span className="relative">Reseting password...</span>
          ) : (
            <span className="relative">Reset Password</span>
          )}
        </Button>
      </div>
    </div>
  );
}
