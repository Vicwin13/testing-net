import { Eye, EyeOff } from "lucide-react";

import React from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PatientLoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };
  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className=" font-medium leading-6 font-switzer pb-2.5"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="eg: johndoe@gmail.com"
            className=" p-2 pl-3 rounded-[40px] bg-[#EEF4FF]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="pb-2.5 font-medium leading-6 font-switzer"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-2 rounded-[40px] pl-3 bg-[#EEF4FF] w-full pr-10"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-gray-900 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <span className="text-[#6B6B6B] text-sm mt-2.5 font-switzer">
            Must be at least 8 characters
          </span>
        </div>

        <button className="bg-(--main-color) text-white py-2.5 rounded-[40px] mt-7.5">
          Login
        </button>
      </form>
    </>
  );
}
