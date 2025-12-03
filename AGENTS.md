# AGENTS.md - Instructions for Google Jules

## 1. Project Overview
**Name:** Asthar Hat E-Commerce Platform
**Type:** Mobile-first, High-performance E-commerce Web App.
**Goal:** Ultra-fast load times (<0.5s first paint), real-time delivery tracking, and automated reporting.

## 2. Tech Stack (Strictly Follow This)
- **Frontend:** Next.js 14 (App Router), Tailwind CSS (JIT mode).
- **Backend:** Next.js Server Actions & API Routes (Node.js runtime).
- **Database:** PostgreSQL (Primary Data) via Prisma ORM.
- **Caching:** Redis (Cache product data with 5-minute TTL).
- **State Management:** Zustand (preferred) or React Context.
- **Validation:** Zod (for all API inputs and env variables).

## 3. Coding Standards & Rules
1. **Mobile First:** Design all UI components for mobile screens first. Use Tailwind's `md:` and `lg:` prefixes for desktop adaptations.
2. **Performance:**
   - Always use `next/image` for images with blur placeholders.
   - Implement lazy loading for components below the fold.
   - Use `next/font` for optimized font loading.
3. **Strict Typing:**
   - Use TypeScript interfaces for all data models and API responses.
   - No `any` types allowed.
4. **Style:**
   - Use Tailwind CSS utility classes.
   - Do not create separate `.css` or `.module.css` files unless absolutely necessary.
5. **Security (Crucial):**
   - **Never hardcode API keys.** Use `process.env` and validate with Zod.
   - Sanitize all user inputs in API routes.

## 4. Key Data Structures
### A. Delivery Tracking Log (`order_tracking_log`)
This table is critical for the real-time tracking feature.
- `id`: String (UUID)
- `order_id`: String (Foreign Key)
- `rider_id`: String
- `gps_lat`: Float
- `gps_lng`: Float
- `timestamp`: DateTime (Default: now)
- `status`: Enum (PENDING, ACCEPTED, PICKED, DELIVERED)

### B. Daily Reports
- Use a Cron job structure to query `orders` table.
- Output format: JSON (do not generate PDF unless explicitly asked).

## 5. Workflow Instructions for Jules
- **Read First:** Before starting any task, scan the existing file structure to avoid duplication.
- **No Hallucinations:** Do not import libraries that are not listed in `package.json`. If a new library is needed, ask for permission or add it to the plan first.
- **Testing:** When writing critical logic (like calculating revenue), add a simple unit test file next to the component (e.g., `revenue.test.ts`).

## 6. Directory Structure
- `/app` - App Router pages and layouts.
- `/components` - Reusable UI components.
- `/lib` - Utility functions (Redis client, Prisma client, Helper functions).
- `/actions` - Server Actions for data mutation.
