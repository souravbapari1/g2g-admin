"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authAdmin } from "@/request/worker/auth";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setLastLogin } from "@/request/worker/users/manageUsers";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState("ADMIN");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    toast.loading("Logging in...");

    try {
      // Sign in with credentials
      const signInResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
        role: type,
      });

      if (signInResponse?.error) {
        throw new Error("Invalid credentials");
      }

      // Perform admin authentication if sign-in succeeds
      const user = await authAdmin({
        email,
        password,
        role: type as any,
      });

      // Store tokens and user details in localStorage
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user.record));
      localStorage.setItem("role", user.record.role);

      // Dismiss loading toast and show success
      toast.dismiss();
      toast.success("Logged in successfully! Redirecting...");
      await setLastLogin(user.record.id);
      // Redirect to dashboard
      if (user.record.role === "ADMIN" || user.record.role === "MANAGER") {
        router.replace("/dashboard");
      } else {
        router.replace("/employee");
      }
    } catch (error) {
      // Show error notification
      toast.dismiss();
      toast.error("Invalid credentials, please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-no-repeat bg-cover w-screen bg-center relative ${
        type === "EMPLOYEE" ? "backdrop-blur-sm" : ""
      }`}
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)",
      }}
    >
      <div
        className={cn(
          "absolute bg-gradient-to-b  opacity-75 inset-0 z-0",
          type === "EMPLOYEE"
            ? "from-blue-500 to-blue-400"
            : "from-green-500 to-green-400"
        )}
      ></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <Image
              src="/logo/main-logo.png"
              alt="Logo"
              width={120}
              height={38}
              className="mb-6 object-contain"
            />
            <h1 className="mb-3 font-bold text-5xl">Hi 👋 Welcome Back</h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto w-96 relative">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl capitalize text-gray-800">
                Sign In as {type.toLowerCase()}
              </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Select
                onValueChange={(value) => setType(value)}
                defaultValue={type}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">I Am Admin</SelectItem>
                  <SelectItem value="EMPLOYEE">I am Employee</SelectItem>
                  <SelectItem value="MANAGER">I Am Manager</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-green-400"
                  type="email"
                  placeholder="mail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className={cn(
                    "w-full flex justify-center  text-gray-100 p-3 rounded-sm tracking-wide font-semibold shadow-sm cursor-pointer transition ease-in duration-500",
                    type === "ADMIN"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  )}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
