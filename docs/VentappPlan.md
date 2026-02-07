# Ideas & Debate Forum - Implementation Plan

## Overview
Build a modern forum application where users can submit ideas and engage in structured debates. Built with Next.js 15 (App Router), TypeScript, Prisma, PostgreSQL, and real-time updates.

## Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | Next.js 15 (App Router) | React framework with Server Components |
| Language | TypeScript | Type safety |
| Database | PostgreSQL | Primary data store |
| ORM | Prisma | Type-safe database access |
| Authentication | Auth.js (NextAuth v5) | Session management, credentials login |
| Real-time | Pusher | WebSocket for live debates (Vercel-friendly) |
| Styling | Tailwind CSS | Utility-first CSS |
| UI Components | shadcn/ui | Pre-built accessible components |
| Validation | Zod | Runtime type validation |

## Database Schema Design

### Core Models

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// User model (extends NextAuth schema)
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  ideas         Idea[]
  comments      Comment[]
  arguments     Argument[]
  votes         Vote[]
}

// From NextAuth Prisma adapter
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Main idea/thread
model Idea {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String?
  status      IdeaStatus @default(OPEN)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  authorId    String

  // Relations
  author     User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments   Comment[]
  arguments  Argument[]

  @@index([authorId])
  @@index([status])
  @@index([createdAt])
}

// Basic comments on ideas
model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  String
  ideaId    String

  // Relations
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  idea   Idea @relation(fields: [ideaId], references: [id], onDelete: Cascade)

  @@index([authorId])
  @@index([ideaId])
  @@index([createdAt])
}

// Structured debate arguments (pro/con)
model Argument {
  id          String        @id @default(cuid())
  content     String
  position    ArgumentPosition
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  authorId    String
  ideaId      String

  // Relations
  author User  @relation(fields: [authorId], references: [id], onDelete: Cascade)
  idea   Idea  @relation(fields: [ideaId], references: [id], onDelete: Cascade)
  votes  Vote[]

  @@index([authorId])
  @@index([ideaId])
  @@index([position])
}

// Votes on arguments
model Vote {
  id         String   @id @default(cuid())
  value      Int // -1 (downvote), 0 (neutral), 1 (upvote)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  userId     String
  argumentId String

  // Relations
  argument Argument @relation(fields: [argumentId], references: [id], onDelete: Cascade)

  @@unique([userId, argumentId])
  @@index([argumentId])
  @@index([userId])
}

enum IdeaStatus {
  OPEN
  CLOSED
  ARCHIVED
}

enum ArgumentPosition {
  PRO
  CON
}
```

## Project Structure

```
vent_app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (main)/
│   │   ├── ideas/
│   │   │   ├── page.tsx              # List all ideas
│   │   │   ├── new/
│   │   │   │   └── page.tsx          # Create new idea
│   │   │   └── [id]/
│   │   │       ├── page.tsx          # Single idea view
│   │   │       └── edit/
│   │   │           └── page.tsx      # Edit idea
│   │   ├── debate/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Debate arena for idea
│   │   ├── profile/
│   │   │   └── [id]/
│   │   │       └── page.tsx          # User profile
│   │   └── layout.tsx
│   ├── api/
│   │   ├── ideas/
│   │   │   └── route.ts              # CRUD for ideas
│   │   ├── comments/
│   │   │   └── route.ts              # CRUD for comments
│   │   ├── arguments/
│   │   │   └── route.ts              # CRUD for arguments
│   │   ├── votes/
│   │   │   └── route.ts              # Handle voting
│   │   └── pusher/
│   │       └── auth.ts               # Pusher auth endpoint
│   ├── auth/
│   │   ├── [...nextauth]/
│   │   │   └── route.ts              # NextAuth API handler
│   │   └── config.ts                 # Auth config
│   ├── layout.tsx
│   └── page.tsx                      # Home page
├── components/
│   ├── ui/                           # shadcn components
│   ├── idea-card.tsx
│   ├── idea-form.tsx
│   ├── comment-list.tsx
│   ├── argument-list.tsx
│   ├── vote-button.tsx
│   ├── debate-arena.tsx              # Real-time debate component
│   └── user-avatar.tsx
├── lib/
│   ├── prisma.ts                     # Prisma client singleton
│   ├── auth.ts                       # Auth.js export
│   ├── pusher.ts                     # Pusher client
│   ├── server-actions.ts             # Server actions for mutations
│   └── validations.ts                # Zod schemas
├── prisma/
│   └── schema.prisma
└── public/
```

## Implementation Steps

### Phase 1: Project Setup & Database (File: 0-5 new files)

1. **Initialize Next.js project**
   - `npx create-next-app@latest` with TypeScript, Tailwind, ESLint
   - Configure `tsconfig.json` with strict mode

2. **Install dependencies**
   ```bash
   npm install prisma @prisma/client
   npm install next-auth@beta @auth/prisma-adapter
   npm install pusher pusher-js
   npm install zod react-hook-form @hookform/resolvers
   npm install -D @types/node
   ```

3. **Setup Prisma**
   - Run `prisma init`
   - Configure `DATABASE_URL` in `.env`
   - Write schema from above
   - Run `prisma migrate dev --name init`
   - Generate Prisma Client: `prisma generate`

4. **Create lib/prisma.ts** - Singleton Prisma client for HMR compatibility

5. **Create lib/validations.ts** - Zod schemas for form validation

### Phase 2: Authentication System (Files: ~4 files)

1. **Create app/auth/config.ts** - NextAuth configuration with Prisma adapter
   - Configure credentials provider (email/password)
   - Add Google OAuth (optional)
   - Setup session strategy

2. **Create app/auth/[...nextauth]/route.ts** - Auth API handler

3. **Create auth middleware/protect pages**
   - Server-side auth checks using `auth()` function
   - Protect new idea creation, debate participation

4. **Create auth pages**
   - `app/(auth)/login/page.tsx` - Login form
   - `app/(auth)/register/page.tsx` - Registration form
   - Server Actions for auth mutations

### Phase 3: Core Features - Ideas (Files: ~6 files)

1. **Create idea API routes** (`app/api/ideas/route.ts`)
   - GET: List all ideas with pagination
   - POST: Create new idea (authenticated)

2. **Create single idea API** (`app/api/ideas/[id]/route.ts`)
   - GET: Get one idea with relations
   - PATCH: Update idea (author only)
   - DELETE: Delete idea (author only)

3. **Create server actions** (`lib/server-actions.ts`)
   - `createIdea()`, `updateIdea()`, `deleteIdea()`
   - Server Actions for direct form calls

4. **Create ideas list page** (`app/(main)/ideas/page.tsx`)
   - Server Component fetching all ideas
   - Filter by status, category
   - Pagination

5. **Create new idea form** (`app/(main)/ideas/new/page.tsx`)
   - Client Component with form
   - Zod validation
   - Server Action submit

6. **Create single idea page** (`app/(main)/ideas/[id]/page.tsx`)
   - Server Component with idea data
   - Display description, metadata
   - Link to debate arena

7. **Create idea components**
   - `components/idea-card.tsx` - Display idea in list
   - `components/idea-form.tsx` - Reusable form

### Phase 4: Comments System (Files: ~4 files)

1. **Create comments API** (`app/api/comments/route.ts`)
   - GET: Comments for an idea
   - POST: Create comment

2. **Create server actions** for comments

3. **Create comment-list component**
   - Display all comments for an idea
   - Show author, timestamp
   - Delete (author only)

4. **Integrate comments** into idea detail page

### Phase 5: Structured Debate System (Files: ~5 files)

1. **Create arguments API** (`app/api/arguments/route.ts`)
   - GET: Arguments for an idea (filtered by position)
   - POST: Create argument (PRO or CON)

2. **Create vote API** (`app/api/votes/route.ts`)
   - POST: Upvote/downvote argument
   - Track user votes (one vote per user per argument)

3. **Create debate arena page** (`app/(main)/debate/[id]/page.tsx`)
   - Split view: PRO arguments vs CON arguments
   - Vote counts displayed
   - Sorted by votes

4. **Create argument components**
   - `components/argument-list.tsx` - List arguments by position
   - `components/vote-button.tsx` - Interactive voting
   - `components/create-argument.tsx` - Form to add PRO/CON

### Phase 6: Real-Time Updates (Files: ~4 files)

1. **Setup Pusher**
   - Create Pusher account, get credentials
   - Add env vars: `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`

2. **Create lib/pusher.ts** - Pusher client singleton

3. **Create Pusher auth endpoint** (`app/api/pusher/auth/route.ts`)
   - Authenticate users for private channels
   - Use session from NextAuth

4. **Create real-time components**
   - `components/debate-arena.tsx` - Client Component with Pusher hooks
   - Listen for events: `argument:new`, `vote:update`
   - Optimistic updates + server sync

5. **Trigger events** in API routes/server actions
   - When argument created: `pusher.trigger('idea-{id}', 'argument:new', argument)`
   - When vote cast: `pusher.trigger('idea-{id}', 'vote:update', vote)`

### Phase 7: User Profiles (Files: ~2 files)

1. **Create profile page** (`app/(main)/profile/[id]/page.tsx`)
   - User info, join date
   - Ideas created
   - Arguments contributed

2. **Create user-avatar component**
   - Display user name, image, stats

### Phase 8: Styling & Polish (Files: ~10 files)

1. **Install shadcn/ui**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button card input textarea label form
   ```

2. **Style all components** with Tailwind + shadcn

3. **Add responsive design**
   - Mobile-first approach
   - Debate arena: stacked on mobile, side-by-side on desktop

4. **Add loading states** (Suspense boundaries)

5. **Add error handling** (error.tsx pages)

## Key Implementation Patterns

### Server Action Pattern (for mutations)
```typescript
// lib/server-actions.ts
'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createIdea(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const idea = await prisma.idea.create({
    data: {
      title: formData.get('title'),
      description: formData.get('description'),
      authorId: session.user.id,
    }
  })

  revalidatePath('/ideas')
  return idea
}
```

### Real-time Pattern
```typescript
// Trigger after mutation
await pusher.trigger(`idea-${ideaId}`, 'argument:new', {
  argument: newArgument
})

// Client component
useEffect(() => {
  const channel = pusher.subscribe(`idea-${ideaId}`)
  channel.bind('argument:new', (data) => {
    // Update state optimistically
  })
}, [])
```

### Protected Server Component
```typescript
// app/(main)/ideas/new/page.tsx
import { auth } from '@/auth'

export default async function NewIdeaPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return <IdeaForm />
}
```

## Testing & Verification

1. **Run development server**: `npm run dev`

2. **Test authentication flow**
   - Register new user
   - Login
   - Visit protected routes
   - Logout

3. **Test idea CRUD**
   - Create idea
   - View idea list
   - View single idea
   - Edit own idea
   - Delete own idea

4. **Test debate system**
   - Add PRO argument
   - Add CON argument
   - Vote on arguments
   - Verify vote counts update

5. **Test real-time**
   - Open two browser windows
   - Create argument in one
   - Verify it appears instantly in other

6. **Test permissions**
   - Verify non-authors can't edit/delete
   - Verify unauthenticated can't create

## Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vent_app"

# NextAuth
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Pusher (for real-time)
PUSHER_APP_ID="your-app-id"
PUSHER_KEY="your-key"
PUSHER_SECRET="your-secret"
PUSHER_CLUSTER="your-cluster"
NEXT_PUBLIC_PUSHER_KEY="your-key"
NEXT_PUBLIC_PUSHER_CLUSTER="your-cluster"
```

## Deployment Considerations

- **Vercel**: Recommended for Next.js + Pusher (works seamlessly)
- **PostgreSQL**: Use Supabase, Neon, or Vercel Postgres
- **Pusher Free Tier**: Sufficient for development/low traffic
