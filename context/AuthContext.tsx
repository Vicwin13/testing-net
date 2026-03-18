"use client";

import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

type Profile = {
  id: string;
  role: "patient" | "hospital";
  firstname: string | null;
  lastname: string | null;
};
type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    metadata?: {
      role?: string;
      firstName?: string;
      lastName?: string;
      hospitalName?: string;
    },
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const ensureProfileExists = async (user: User) => {
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existingProfile) {
      // Create base profile
      await supabase.from("profiles").insert({
        id: user.id,
        role: user.user_metadata?.role,
        firstname: user.user_metadata?.firstName || null,
        lastname: user.user_metadata?.lastName || null,
        hospitalName: user.user_metadata?.hospitalName || null,
      });

      // If hospital, create hospital row
      if (user.user_metadata?.role === "hospital") {
        await supabase.from("hospitals").insert({
          id: user.id,
          verified: false,
        });
      }
    }
  };

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setProfile(data);
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (
    email: string,
    password: string,
    metadata?: {
      role?: string;
      firstName?: string;
      lastName?: string;
      hospitalName?: string;
    },
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session;
      const currentUser = currentSession?.user ?? null;

      if (currentUser) {
        await ensureProfileExists(currentUser);
        await fetchProfile(currentUser.id);
      }

      setSession(currentSession);
      setUser(currentUser);
      setLoading(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;

        if (currentUser) {
          await ensureProfileExists(currentUser);
          await fetchProfile(currentUser.id);
        }
        setSession(session);
        setUser(currentUser);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signIn, signUp, signOut, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
