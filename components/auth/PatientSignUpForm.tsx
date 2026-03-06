import React from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PatientSignUpForm() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await signUp(email, password, { role: "patient" });
      toast.success(
        "Sign up successful! Please check your email to verify your account.",
      );
      router.push("/login");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Sign up failed");
    }
  };
  return (
    <>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 rounded"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white py-2 rounded">Sign Up</button>
      </form>
    </>
  );
}
