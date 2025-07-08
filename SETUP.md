# Development Setup

## Getting Started

After pulling the latest changes, follow these steps:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with:

```env
DATABASE_URL="postgresql://postgres:mergeconflict2025@db.zqjbaqgtnpchjgkozdgd.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL=https://zqjbaqgtnpchjgkozdgd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxamJhcWd0bnBjaGpna296ZGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MDM2NjgsImV4cCI6MjA2NzQ3OTY2OH0.0bDaZKEgiPRucOfeiTg0XC7PFv6XpZAXgaAn8KioCkA
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

## Database Notes

- We're now using **Supabase** for both database and authentication
- Database tables are already created and migrated
- No need to run `prisma migrate` or `prisma db push`
- If you need to seed data: `npm run seed`

## Supabase Dashboard

Access the Supabase dashboard at: https://zqjbaqgtnpchjgkozdgd.supabase.co

## Troubleshooting

- If you get Prisma client errors, run `npx prisma generate`
- If you get connection errors, check your `.env` file
- For database issues, check the Supabase dashboard
