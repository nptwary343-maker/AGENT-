Updated AGENTS.md File
# AGENTS.md - Instructions for Google Jules

## 1. Project Overview
**Name:** Asthar Hat E-Commerce Platform
**Type:** Mobile-first, High-performance E-commerce Web App.
**Goal:** Ultra-fast load times (<0.5s first paint), real-time tracking, and pixel-perfect UI implementation.

## 2. Tech Stack (Strictly Follow This)
- **Frontend:** Next.js 14 (App Router), Tailwind CSS (JIT mode).
- **Icons:** Lucide-react (Use distinct, thin-stroke icons) [Source: 19].
- **Backend:** Next.js Server Actions & API Routes (Node.js).
- **Database:** PostgreSQL (Prisma ORM).
- **Caching:** Redis (5-minute TTL).
- **State Management:** Zustand.
- **Validation:** Zod.

## 3. UI/UX & Component Guidelines [Source: 16, 17]

### A. App Shell Layout (Responsive)
- **Mobile View:**
  - Show a fixed **Bottom Navigation Bar** with 4 items: Home, Categories, Cart, Profile.
  - Hide the top Sidebar/Menu.
- **Desktop View:**
  - Show a **Left Sidebar** or Mega Menu for Categories.
  - Hide the Bottom Navigation Bar.

### B. Homepage Sections Order
1. **Header:** Logo + Search Bar + Cart Count.
2. **Hero Slider:** Banner carousel with autoplay.
3. **Quick Categories:** Circular icons with horizontal scrolling.
4. **Flash Sale:** Countdown timer + Horizontal product scroll.
5. **"Just For You":** Infinite scroll product grid.

### C. Product Card Design
- **Aspect Ratio:** Images must be square (1:1).
- **Typography:**
  - Title: Truncate to maximum 2 lines.
  - Price: Original Price (strikethrough/gray), Discounted Price (Bold/Primary Color).
- **Badges:** Show "% OFF" badge on the top-left of the image if a discount exists.
- **Action:** "Add to Cart" button (Use an icon button on mobile).

## 4. Key Data Models (Prisma Schema) [Source: 18]

### A. Product Model (`Product`)
Use this exact schema structure for the Product table:
- `id`: String (UUID)
- `title`: String
- `slug`: String (Unique)
- `price`: Float
- `discount_price`: Float (Nullable)
- `stock_status`: Enum (IN_STOCK, OUT_OF_STOCK)
- `thumbnail`: String (URL)
- `category_id`: String (Foreign Key)

### B. Delivery Tracking Log (`OrderTracking`)
- `order_id`: String
- `rider_id`: String
- `gps_lat`: Float
- `gps_lng`: Float
- `timestamp`: DateTime
- `status`: Enum (PENDING, ACCEPTED, PICKED, DELIVERED)

## 5. Coding Standards
1. **Performance:** Use `next/image` for all images. Implement lazy loading for "Just For You" section.
2. **Strict Typing:** Always define TypeScript interfaces based on the Data Models above.
3. **Styling:** Use Tailwind Utility classes. No custom CSS files.
4. **Security:** Validate all inputs with Zod. Never hardcode API keys.

## 6. Workflow for Jules
- **Read First:** Before writing code, review this file to ensure the UI matches the App Shell and Product Card specs.
- **No Hallucinations:** Only use `lucide-react` for icons. Do not import `react-icons` or `fontawesome`.
- **Testing:** Write unit tests for the 'Price Calculation' logic (discount vs original p
