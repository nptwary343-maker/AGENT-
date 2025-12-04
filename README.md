# Asthar Hat E-Commerce Platform

A mobile-first, high-performance e-commerce web application for premium hats and accessories.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS (JIT mode)
- **Icons:** Lucide-react
- **Backend:** Next.js Server Actions & API Routes
- **Database:** PostgreSQL (Prisma ORM)
- **Caching:** Redis (5-minute TTL)
- **State Management:** Zustand
- **Validation:** Zod
- **Authentication:** NextAuth.js

## Features

- Responsive design with mobile-first approach
- Bottom navigation for mobile, sidebar for desktop
- Hero slider with autoplay
- Quick categories with horizontal scrolling
- Flash sale section with countdown timer
- Infinite scroll product grid
- Product cards with discount badges
- Shopping cart with persistent storage
- User authentication (login/register)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis instance (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nptwary343-maker/AGENT-.git
cd AGENT-
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database and Redis credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/asthar_hat?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
UPSTASH_REDIS_REST_URL="your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"
```

4. Set up the database:
```bash
npx prisma db push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
asthar-hat/
├── app/                    # Next.js 14 App Router
│   ├── (shop)/            # Shop route group
│   │   ├── page.tsx       # Homepage
│   │   ├── categories/    # Category pages
│   │   ├── products/      # Product pages
│   │   ├── cart/          # Cart page
│   │   └── profile/       # Profile page
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── home/              # Homepage sections
│   └── product/           # Product components
├── lib/                   # Utilities and configs
├── stores/                # Zustand stores
├── types/                 # TypeScript types
├── schemas/               # Zod validation schemas
└── prisma/                # Database schema and seed
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List products with pagination |
| `/api/products/[slug]` | GET | Get single product |
| `/api/categories` | GET | List all categories |
| `/api/auth/[...nextauth]` | * | Auth handlers |
| `/api/auth/register` | POST | User registration |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Your production URL
- `UPSTASH_REDIS_REST_URL` - Redis URL (optional)
- `UPSTASH_REDIS_REST_TOKEN` - Redis token (optional)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - see LICENSE file for details.
