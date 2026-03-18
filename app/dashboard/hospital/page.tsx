"use client";

import AuthProtected from "@/components/AuthProtected";

export default function HospitalDashboard() {
  return (
    <AuthProtected allowedRoles={["hospital"]} redirectTo="/auth">
      <div className="max-w-4xl px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Hospital Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome to your hospital dashboard. Manage your hospital profile, appointments, and services here.
        </p>
      </div>
    </AuthProtected>
  );
}
