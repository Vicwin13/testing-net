# MedNet

MedNet is a modern healthcare platform that connects patients with hospitals. It provides a seamless experience for patients to discover hospitals, view their services, and access healthcare information, while offering hospitals a platform to showcase their facilities and manage their presence.

## Features

### For Patients
- **Hospital Discovery**: Browse and search for hospitals based on various criteria
- **Hospital Profiles**: View detailed information about hospitals including services, location, and contact details
- **User Authentication**: Secure sign up and login functionality for personalized experience
- **Dashboard**: Personalized dashboard to manage healthcare preferences

### For Hospitals
- **Hospital Dashboard**: Manage hospital profile and services
- **Authentication**: Secure sign up and login for hospital administrators
- **Profile Management**: Update hospital information and services

## Technologies Used

- **Next.js 16** - React framework for building the application with App Router
- **React 19** - UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Supabase** - Backend-as-a-Service providing authentication and database
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful and consistent icon library
- **Sonner** - Toast notifications for user feedback

## Project Structure

```
mednet/
├── app/                      # Next.js App Router pages
│   ├── auth/                # Authentication pages
│   │   ├── page.tsx         # Main auth page with role selection
│   │   └── patient/         # Patient-specific auth pages
│   ├── dashboard/           # Protected dashboard pages
│   │   ├── hospital/        # Hospital dashboard
│   │   └── patient/         # Patient dashboard
│   │       └── hospitals/   # Hospital listings and details
│   ├── data/                # Static data and mock data
│   └── fonts/               # Custom fonts
├── components/              # Reusable React components
│   ├── auth/               # Authentication components
│   │   ├── AuthContainer.tsx
│   │   ├── PatientLoginForm.tsx
│   │   ├── PatientSignUpForm.tsx
│   │   ├── HospitalLoginForm.tsx
│   │   ├── HospitalSignUpForm.tsx
│   │   ├── ModeToggle.tsx
│   │   └── RoleToggle.tsx
│   └── patient/            # Patient-specific components
│       ├── Header.tsx
│       ├── HospitalCard.tsx
│       ├── Searchbar.tsx
│       ├── Filterbar.tsx
│       └── Sidebar.tsx
├── context/                # React Context providers
│   └── AuthContext.tsx     # Authentication context
├── lib/                    # Utility libraries
│   └── supabase.ts        # Supabase client configuration
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager installed
- Supabase account and project created

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mednet
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
meet author of the project to get access to the env file

You can find these values in your Supabase project settings under **API**.

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

## Supabase Setup

To set up Supabase for this project:

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to your project settings and copy the URL and anon key
3. Add them to your `.env.local` file
4. Set up authentication providers in Supabase (email/password is enabled by default)
5. Create the necessary database tables for hospitals, patients, and related data

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn about React
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - Learn about TypeScript
- [Supabase Documentation](https://supabase.com/docs) - Learn about Supabase
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS

## License

This project is private and confidential.

## Support

For support or questions, please contact the development team.
