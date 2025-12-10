# Kenya Infrastructure Livability Platform

A crowdsourced platform for tracking power, water, and internet reliability across Kenya. Users can report utility status for buildings, view composite livability scores, and make informed decisions about where to live or work.

## 🚀 Features

- **Interactive Map**: Mapbox-powered map showing buildings with color-coded livability scores
- **Utility Tracking**: Track power, water, and internet status (stable/flickering/outage)
- **Smart Scoring**: Recency-weighted scoring algorithm with data trust validation
- **User Authentication**: Secure JWT-based authentication with role-based access
- **Admin Dashboard**: Moderation tools for managing reports and flagging suspicious activity
- **Beautiful UI**: Component-heavy modern design with Tailwind CSS and Framer Motion
- **Dark Mode**: Full dark mode support with system preference detection

## 🛠️ Tech Stack

### Backend
- **Node.js 20 LTS** with **Express.js 4.19+**
- **PostgreSQL 16** (Docker)
- **Redis 7.2** (Docker) - Session management & rate limiting
- **Prisma 5.22+** - Type-safe ORM
- **TypeScript 5.6+**

### Frontend
- **React 18.3+** with **Vite 5.4+**
- **TypeScript 5.6+**
- **Tailwind CSS 3.4+**
- **Mapbox GL JS 3.7+** with **react-map-gl 7.1+**
- **Framer Motion 11.5+** - Animations
- **Lucide React 0.446+** - Icons
- **React Router 6.26+** - Routing

### DevOps
- **Docker Compose** - PostgreSQL, Redis, pgAdmin
- **Prisma Migrate** - Database migrations
- **tsx** - TypeScript execution

## 📋 Prerequisites

- **Node.js 20 LTS** or higher
- **Docker Desktop** (for PostgreSQL and Redis)
- **npm** or **pnpm**

## 🏁 Quick Start

### 1. Clone and Install

```bash
# Navigate to project directory
cd Livability

# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Start Docker Services

```bash
# Start PostgreSQL and Redis containers
npm run docker:up

# Verify containers are running
docker ps
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

### 4. Start Development Servers

```bash
# Start both backend and frontend concurrently
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555 (run `npm run prisma:studio`)
- **pgAdmin**: http://localhost:5050 (admin@livability.local / admin)

## 🗄️ Database Schema

### Models

- **User** - Authentication and user roles (USER, ADMIN)
- **Building** - Physical locations with coordinates and neighborhood data
- **Report** - Utility status reports (power, water, internet)
- **AdminAuditLog** - Moderation action tracking

### Seed Data

The database is seeded with:
- Admin user: `admin@livability.ke` / `admin123`
- Test user: `user@livability.ke` / `user123`
- 5 sample buildings in Nairobi neighborhoods
- Sample utility reports for each building

## 🔧 Available Scripts

### Root Level
```bash
npm run dev              # Start both server and client
npm run docker:up        # Start Docker containers
npm run docker:down      # Stop Docker containers
npm run docker:logs      # View Docker logs
npm run setup            # Full setup (Docker + migrate + seed)
npm run clean            # Clean all node_modules and stop Docker
```

### Server (`cd server`)
```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:seed      # Seed database
```

### Client (`cd client`)
```bash
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## 🌍 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://admin:livability_dev_password_2024@localhost:5432/livability"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Mapbox
VITE_MAPBOX_TOKEN="pk.eyJ1Ijoia2VueWFubm9vYiIsImEiOiJjbWl6MDI1YjQwaWJzM2dzZDVycTc5eG8wIn0.3FwhEXFAgdtWYskB7_amGw"

# Server
PORT=3000
NODE_ENV="development"

# Frontend
VITE_API_URL="http://localhost:3000"
```

## 📁 Project Structure

```
Livability/
├── docker-compose.yml          # Docker services configuration
├── .env                        # Environment variables
├── package.json                # Root package with concurrent scripts
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seed script
├── server/
│   ├── src/
│   │   ├── index.ts           # Express server entry point
│   │   ├── lib/
│   │   │   └── prisma.ts      # Prisma client singleton
│   │   ├── routes/            # API routes (to be created)
│   │   ├── controllers/       # Route controllers (to be created)
│   │   ├── middleware/        # Auth, validation, etc. (to be created)
│   │   └── services/          # Business logic (to be created)
│   ├── package.json
│   └── tsconfig.json
└── client/
    ├── src/
    │   ├── main.tsx           # React entry point
    │   ├── App.tsx            # Main app component
    │   ├── index.css          # Global styles + Tailwind
    │   ├── components/        # Reusable components (to be created)
    │   ├── pages/             # Page components (to be created)
    │   ├── hooks/             # Custom React hooks (to be created)
    │   └── utils/             # Utility functions (to be created)
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🎨 Design System

The platform uses a carefully crafted design system:

- **Colors**: Kenya-inspired earth tones with semantic utility colors
- **Typography**: Inter font with 8-level scale (display to caption)
- **Spacing**: 4px-based grid system
- **Shadows**: 5-level elevation system
- **Animations**: Smooth transitions and micro-interactions

See `client/tailwind.config.js` for the complete design token system.

## 🔐 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: HTTP-only cookies with 7-day expiration
- **Rate Limiting**: Redis-based 12-hour cooldown per user/utility/building
- **Input Validation**: Zod schemas on all API endpoints
- **Security Headers**: Helmet middleware
- **CORS**: Configured for localhost development

## 🧪 Testing

Manual testing checklist available in the project plan. Automated tests to be added in future iterations.

## 📊 Scoring Algorithm

Buildings receive composite scores (0-100) based on:
1. **Utility Status**: Stable (100), Flickering (50), Outage (0)
2. **Recency Weighting**: 
   - 0-7 days: 100% weight
   - 8-30 days: 50% weight
   - 30+ days: Excluded
3. **Data Trust**: Minimum 5 reports from 3+ users within 30 days

## 🚧 Roadmap

- [x] Project setup with Docker + Prisma
- [x] Database schema and migrations
- [x] Basic Express API structure
- [x] React frontend with Tailwind
- [ ] Authentication system
- [ ] Map implementation with Mapbox
- [ ] Building detail pages
- [ ] Report submission flow
- [ ] Admin dashboard
- [ ] Scoring engine
- [ ] Production deployment

## 📝 License

MIT

## 👥 Contributors

Built with ❤️ for Kenya
