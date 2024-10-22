"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { authAdmin } from "@/request/worker/auth";

export function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      toast.loading("Logging in...");
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      const user = await authAdmin({
        email,
        password,
        role: "ADMIN",
      });
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user.record));
      localStorage.setItem("role", user.record.role);
      // @ts-ignore
      toast.dismiss();
      toast.success("Logged in. Redirecting...");
      window.location.replace("/dashboard"); // @ts-ignore
      setLoading(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Invalid credentials");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Image
          src="/logo/main-logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="dark:invert h-10 mx-auto mb-4 object-contain"
        />
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={loading}
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>

              <Input
                disabled={loading}
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <Button disabled={loading} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
