# AuthProtected Component

The `AuthProtected` component is a wrapper that protects routes by requiring user authentication. It can also restrict access based on user roles.

## Usage

### Basic Usage - Require Authentication Only

Protect any route by wrapping your page content with `AuthProtected`:

```tsx
"use client";

import AuthProtected from "@/components/AuthProtected";

export default function MyProtectedPage() {
  return (
    <AuthProtected>
      <div>
        <h1>Protected Content</h1>
        <p>Only logged-in users can see this.</p>
      </div>
    </AuthProtected>
  );
}
```

### Role-Based Protection

Restrict access to specific user roles using the `allowedRoles` prop:

```tsx
"use client";

import AuthProtected from "@/components/AuthProtected";

// Only patients can access this page
export default function PatientDashboard() {
  return (
    <AuthProtected allowedRoles={["patient"]}>
      <div>
        <h1>Patient Dashboard</h1>
      </div>
    </AuthProtected>
  );
}

// Only hospitals can access this page
export default function HospitalDashboard() {
  return (
    <AuthProtected allowedRoles={["hospital"]}>
      <div>
        <h1>Hospital Dashboard</h1>
      </div>
    </AuthProtected>
  );
}

// Both patients and hospitals can access
export default function SharedPage() {
  return (
    <AuthProtected allowedRoles={["patient", "hospital"]}>
      <div>
        <h1>Shared Page</h1>
      </div>
    </AuthProtected>
  );
}
```

### Custom Redirect URL

Specify where unauthenticated users should be redirected:

```tsx
<AuthProtected redirectTo="/custom-login-page">
  {/* Content */}
</AuthProtected>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | The protected content to render |
| `allowedRoles` | `("patient" \| "hospital")[]` | `undefined` | Optional array of allowed user roles. If not provided, any authenticated user can access. |
| `redirectTo` | `string` | `"/login"` | The URL to redirect unauthenticated users to |

## Behavior

1. **Loading State**: While checking authentication status, shows a loading indicator.
2. **Unauthenticated**: Redirects to `/login` (or custom `redirectTo`) and renders nothing.
3. **Authenticated but Wrong Role**: Redirects to `/auth` and renders nothing.
4. **Authenticated with Correct Role**: Renders the children.

## Example in Your Project

The hospital detail page at [`app/auth/patient/hospitals/[id]/page.tsx`](app/auth/patient/hospitals/[id]/page.tsx:1) is protected:

```tsx
export default function HospitalDetailPage() {
  // ... component logic

  return (
    <AuthProtected allowedRoles={["patient"]}>
      <div className="max-w-5xl px-8 py-8">
        {/* Hospital detail content */}
      </div>
    </AuthProtected>
  );
}
```

This ensures only logged-in patients can view hospital details and book appointments.

## Notes

- The component uses the [`useAuth`](context/AuthContext.tsx:1) hook to access authentication state.
- Make sure your app is wrapped with the [`AuthProvider`](context/AuthContext.tsx:43) component.
- The component is client-side only (uses `"use client"` directive).
