# 📁 Project Structure Guide

## 🏗️ Overall Architecture

```
Oyun-Uhaanii-Academy/
├── 📁 back-end/                 # Backend API Server
├── 📁 front-end/                # Frontend Next.js App
├── 📄 package.json              # Root package.json with scripts
├── 📄 README.md                 # Main documentation
├── 📄 PROJECT_STRUCTURE.md      # This file
├── 📄 setup.sh                  # Setup script
└── 📄 .gitignore                # Git ignore rules
```

## 🔧 Backend Structure

```
back-end/
├── 📁 src/
│   ├── 📁 controllers/          # API Controllers
│   │   ├── authController.ts    # Authentication logic
│   │   └── productController.ts # Product management
│   ├── 📁 routes/               # API Routes
│   │   ├── authRoutes.ts        # Auth endpoints
│   │   └── productRoutes.ts     # Product endpoints
│   ├── 📁 middleware/           # Express Middleware
│   │   ├── authMiddleware.ts    # JWT authentication
│   │   └── errorHandler.ts      # Error handling
│   └── index.ts                 # Main server file
├── 📁 prisma/                   # Database Schema
│   ├── 📁 migrations/           # Database migrations
│   └── schema.prisma            # Prisma schema
├── 📁 utils/                    # Utility Functions
│   ├── jwt.ts                   # JWT utilities
│   └── prisma.ts                # Prisma client
├── 📄 package.json              # Backend dependencies
├── 📄 tsconfig.json             # TypeScript config
└── 📄 .env                      # Environment variables
```

## 🎨 Frontend Structure

```
front-end/
├── 📁 src/
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── 📁 _components/      # Shared Components
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   ├── Header.tsx       # Site header
│   │   │   └── HeroSection.tsx  # Hero section
│   │   ├── 📁 admin/            # Admin Dashboard
│   │   │   ├── 📁 courses/      # Course management
│   │   │   ├── 📁 products/     # Product management
│   │   │   ├── 📁 tournaments/  # Tournament management
│   │   │   ├── 📁 users/        # User management
│   │   │   ├── 📁 settings/     # Settings page
│   │   │   ├── 📁 reports/      # Reports page
│   │   │   └── page.tsx         # Admin dashboard
│   │   ├── 📁 api/              # API Routes
│   │   │   └── 📁 products/     # Product API
│   │   ├── 📁 courses/          # Course pages
│   │   ├── 📁 tournaments/      # Tournament pages
│   │   ├── 📁 about/            # About page
│   │   ├── 📁 contact/          # Contact page
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── 📁 components/           # Reusable Components
│   │   └── 📁 ui/               # UI Components
│   │       └── navigation-menu.tsx
│   └── 📁 lib/                  # Utility Libraries
│       ├── prisma.ts            # Prisma client
│       └── utils.ts             # Utility functions
├── 📁 prisma/                   # Frontend Prisma
│   └── schema.prisma            # Frontend schema
├── 📁 public/                   # Static Assets
│   ├── logo.svg                 # Site logo
│   ├── academy.png               # About image
│   └── xyno.jpg                 # Hero image
├── 📄 package.json              # Frontend dependencies
├── 📄 tsconfig.json             # TypeScript config
├── 📄 next.config.ts            # Next.js config
├── 📄 tailwind.config.js        # Tailwind config
└── 📄 .env.local                # Frontend environment
```

## 📋 File Naming Conventions

### Backend

- **Controllers**: `camelCase.ts` (e.g., `authController.ts`)
- **Routes**: `camelCase.ts` (e.g., `authRoutes.ts`)
- **Middleware**: `camelCase.ts` (e.g., `authMiddleware.ts`)
- **Utils**: `camelCase.ts` (e.g., `jwt.ts`)

### Frontend

- **Pages**: `page.tsx` (Next.js App Router)
- **Components**: `PascalCase.tsx` (e.g., `Header.tsx`)
- **Layouts**: `layout.tsx`
- **API Routes**: `route.ts`

## 🗂️ Database Structure

### Models

- **User**: Authentication and user management
- **Product**: Product catalog and inventory
- **Course**: Educational courses
- **Tournament**: Competition management

### Relationships

- Users can enroll in multiple courses
- Users can participate in tournaments
- Products can be categorized
- Courses can have multiple lessons

## 🔐 Security Structure

### Authentication

- JWT tokens for session management
- bcrypt for password hashing
- Middleware for route protection

### Authorization

- Role-based access control
- Admin vs regular user permissions
- API endpoint protection

## 🚀 Deployment Structure

### Environment Variables

- **Development**: `.env` files in respective directories
- **Production**: Environment variables in hosting platform

### Build Process

- **Backend**: TypeScript compilation
- **Frontend**: Next.js build process
- **Database**: Prisma migrations

## 📝 Documentation Structure

- **README.md**: Main project documentation
- **PROJECT_STRUCTURE.md**: This file
- **API_DOCS.md**: API endpoint documentation
- **DEPLOYMENT.md**: Deployment instructions

## 🔄 Development Workflow

1. **Feature Development**: Create feature branches
2. **Backend First**: Develop API endpoints
3. **Frontend Integration**: Connect to backend APIs
4. **Testing**: Test both frontend and backend
5. **Deployment**: Deploy to staging/production

## 🛠️ Development Commands

### Root Level

```bash
npm run dev              # Start both servers
npm run backend          # Start backend only
npm run frontend         # Start frontend only
npm run install:all      # Install all dependencies
```

### Backend Only

```bash
cd back-end
npm run dev              # Development server
npm run build            # Production build
npm start                # Production server
```

### Frontend Only

```bash
cd front-end
npm run dev              # Development server
npm run build            # Production build
npm start                # Production server
```

### Database

```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema to database
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```
