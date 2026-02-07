# Vent - Ideas & Debate Forum

## Project Overview

**Vent** is a modern forum application where users can submit ideas and engage in structured, thoughtful debates. The platform provides a space for civil discourse on topics that matter, with features for posting debates, commenting on hot topics, and participating in structured pro/con discussions.

### Core Concept
- **Post Debates**: Users can create debate topics with titles and descriptions
- **Comment on Hot Topics**: Join discussions on trending issues
- **Debate Forums**: Enter live debate arenas with structured PRO/CON arguments and voting

---

## Tech Stack

| Component | Technology | Status |
|-----------|-----------|--------|
| Frontend | Next.js 15 (App Router) | ✅ Installed |
| Language | TypeScript | ✅ Configured |
| Styling | Tailwind CSS | ✅ Configured |
| Database | PostgreSQL + Prisma | 🔄 Planned |
| Authentication | Auth.js (NextAuth) | 🔄 Planned |
| Real-time | Pusher | 🔄 Planned |
| UI Components | shadcn/ui | 🔄 Planned |
| Validation | Zod | 🔄 Planned |

---

## Project Structure

```
vent_app/
├── app/
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard with 3 tabs
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── docs/
│   ├── VentappPlan.md            # Full implementation plan
│   └── context.md                # This file
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── postcss.config.mjs            # PostCSS config
├── next.config.ts                # Next.js config
└── .gitignore                    # Git ignore rules
```

---

## Files Created

| File | Purpose | Lines |
|------|---------|-------|
| `package.json` | Project dependencies and scripts | ~25 |
| `tsconfig.json` | TypeScript configuration | ~30 |
| `tailwind.config.ts` | Tailwind CSS setup | ~15 |
| `postcss.config.mjs` | PostCSS configuration | ~8 |
| `next.config.ts` | Next.js configuration | ~5 |
| `.gitignore` | Git ignore patterns | ~35 |
| `app/globals.css` | Global styles and Tailwind imports | ~30 |
| `app/layout.tsx` | Root layout with metadata | ~20 |
| `app/page.tsx` | Landing page with hero section | ~100 |
| `app/dashboard/page.tsx` | Main dashboard (3 tabs) | ~350 |

**Total**: ~12 files, ~618 lines of code

---

## Features Implemented

### ✅ Completed

1. **Landing Page** (`/`)
   - Hero section with app description
   - Feature cards explaining the platform
   - Call-to-action buttons
   - Navigation header

2. **Dashboard** (`/dashboard`)
   - Tab navigation (3 sections)
   - **Post Debates Tab**
     - Form to create new debates
     - List of user's recent debates
     - PRO/CON vote counts display
   - **Hot Topics Tab**
     - Comment form for discussions
     - Recent comments feed
     - Trending topics with engagement stats
   - **Debate Forums Tab**
     - Active debate forums grid
     - Live status indicators
     - Quick stats (active debates, participants, arguments)
     - "Join Debate" buttons

3. **UI/UX**
   - Responsive design (mobile-friendly)
   - Tailwind CSS styling
   - Hover effects and transitions
   - Color-coded PRO (green) / CON (red) votes
   - Hot topic badges

### 🔄 In Progress

- None currently

### 📋 Planned (from VentappPlan.md)

1. **Phase 1**: Database Setup (Prisma + PostgreSQL)
2. **Phase 2**: Authentication System (Auth.js)
3. **Phase 3**: Core Ideas Feature (API routes + server actions)
4. **Phase 4**: Comments System
5. **Phase 5**: Structured Debate System (PRO/CON arguments)
6. **Phase 6**: Real-Time Updates (Pusher)
7. **Phase 7**: User Profiles
8. **Phase 8**: Polish & shadcn/ui components

---

## Last Changes Made

### Date: 2025-02-07

**Session: Initial Project Setup**

1. **Created Next.js Project**
   - Initialized with TypeScript, Tailwind CSS, ESLint
   - Configured App Router (not Pages Router)
   - Set up proper project structure

2. **Built Landing Page**
   - Hero section with "Vent" branding
   - Feature cards: Post Debates, Comment on Hot Topics, Structured Debates
   - Navigation links
   - Responsive layout

3. **Built Dashboard**
   - Tab-based navigation (3 tabs)
   - **Post Debates**: Form to create debates, list recent debates
   - **Hot Topics**: Comment form, recent comments, trending topics
   - **Debate Forums**: Active forums grid, live indicators, stats
   - Mock data for demonstration

4. **Started Dev Server**
   - Running on http://localhost:3000
   - Hot reload enabled

---

## Database Schema (Planned)

From `docs/VentappPlan.md`, the planned Prisma schema includes:

```prisma
Model User {
  id, name, email, createdAt
  relations: ideas, comments, arguments, votes
}

Model Idea {
  id, title, description, category, status
  relations: author, comments, arguments
}

Model Comment {
  id, content, createdAt
  relations: author, idea
}

Model Argument {
  id, content, position (PRO/CON)
  relations: author, idea, votes
}

Model Vote {
  id, value (-1/0/1)
  relations: argument
}
```

---

## Next Steps

### Immediate (Recommended Order)

1. **Setup Prisma + Database**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   # Configure DATABASE_URL in .env
   # Create schema.prisma with models
   npx prisma migrate dev --name init
   ```

2. **Add Authentication**
   ```bash
   npm install next-auth@beta @auth/prisma-adapter
   # Create app/auth/config.ts
   # Create login/register pages
   ```

3. **Create API Routes**
   - `/api/ideas` - CRUD for ideas
   - `/api/comments` - CRUD for comments
   - `/api/arguments` - CRUD for arguments
   - `/api/votes` - Handle voting

4. **Connect Dashboard to Real Data**
   - Replace mock data with Prisma queries
   - Add Server Actions for mutations
   - Implement proper state management

### Medium Term

5. **Add Real-Time Features**
   - Install Pusher (`npm install pusher pusher-js`)
   - Create Pusher client (`lib/pusher.ts`)
   - Add auth endpoint for private channels
   - Update components to listen for real-time events

6. **Refine UI with shadcn/ui**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button card input textarea label form
   ```

7. **Add User Profiles**
   - Profile page (`/profile/[id]`)
   - User stats (ideas created, arguments contributed)
   - Avatar component

### Long Term

8. **Advanced Features**
   - Search and filtering
   - Categories/tags
   - Notifications
   - Moderation tools
   - Analytics dashboard

---

## Environment Variables (Needed)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vent_app"

# NextAuth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Pusher (for real-time)
PUSHER_APP_ID="your-app-id"
PUSHER_KEY="your-key"
PUSHER_SECRET="your-secret"
PUSHER_CLUSTER="your-cluster"
NEXT_PUBLIC_PUSHER_KEY="your-key"
NEXT_PUBLIC_PUSHER_CLUSTER="your-cluster"
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Database commands (after Prisma setup)
npx prisma generate          # Generate Prisma Client
npx prisma migrate dev       # Run migrations
npx prisma studio            # Open Prisma Studio GUI
npx prisma db push           # Push schema changes
```

---

## Deployment Notes

- **Recommended Platform**: Vercel (seamless Next.js integration)
- **Database Options**: Supabase, Neon, or Vercel Postgres
- **Real-time**: Pusher Free Tier (sufficient for development)

---

## Links

- **Local Dev**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Full Plan**: See `docs/VentappPlan.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Auth.js Docs**: https://authjs.dev

---

## Notes

- Current implementation uses **mock data** stored in component state
- No persistence yet (data resets on refresh)
- No authentication yet (anyone can post)
- No real-time updates yet (manual refresh required)
- Using client-side state management for demonstration purposes

---

*Last Updated: 2025-02-07*
