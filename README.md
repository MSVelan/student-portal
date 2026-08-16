# Student Portal

A simple student portal built to practice Git workflows — includes login/signup, profile management, a personalized timetable, group-based note sharing, and basic settings.

> This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and is not intended to be a production-grade portal — it focuses on demonstrating clean, meaningful commits across multiple Git branches.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** SQLite via `better-sqlite3` (file-based, no external DB service required)
- **Auth:** `bcryptjs` for password hashing

## Project Structure

```
student-portal/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/                # Login page
│   ├── signup/                # Signup page
│   ├── profile/                # Profile page
│   ├── dashboard/                # Dashboard + timetable
│   ├── settings/                # Settings page
│   ├── groups/                # Groups + notes page
│   └── api/                # Backend API routes
├── components/                # Reusable React components
├── lib/config/database.ts    # SQLite schema and connection
├── data/                # SQLite database file (gitignored)
└── README.md
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
