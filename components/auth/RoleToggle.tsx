import React from "react";

type RoleToggleProps = {
  role: "patient" | "hospital";
  setRole: (role: "patient" | "hospital") => void;
};

export default function RoleToggle({ role, setRole }: RoleToggleProps) {
  return (
    <div className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded-md ${role === "patient" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
        onClick={() => setRole("patient")}
      >
        Patient
      </button>
      <button
        className={`px-4 py-2 rounded-md ${role === "hospital" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}`}
        onClick={() => setRole("hospital")}
      >
        Hospital
      </button>
    </div>
  );
}
