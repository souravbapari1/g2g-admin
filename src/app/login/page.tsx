import { auth } from "@/auth";
import LoginForm from "@/components/login-form";

export default async function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <LoginForm />
    </div>
  );
}
