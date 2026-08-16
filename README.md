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

## Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/<your-username>/student-portal.git
   cd student-portal
```

2. **Install dependencies**
```bash
   npm install
```

3. **Approve native build scripts** (required for `better-sqlite3`)
```bash
   npm install-scripts approve better-sqlite3
   npm install-scripts approve unrs-resolver
   npm install
```
   If that command isn't available on your npm version, instead run:
```bash
   npm rebuild better-sqlite3
```

4. **Seed sample groups** (optional, needed for the Groups feature to show data)
```bash
   npm install -D tsx
   npx tsx lib/seed.ts
```
