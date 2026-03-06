"use client";

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "Signup successful! Please check your email to confirm your account.",
      );
    }
  };
}
