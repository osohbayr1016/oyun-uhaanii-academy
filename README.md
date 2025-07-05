# 🎓 Oyun Uhaanii Academy

A full-stack educational platform for Mongolian culture, history, and literature.

## 📁 Project Structure

```
Oyun-Uhaanii-Academy/
├── 📁 back-end/                 # Backend API (Node.js + Express + Prisma)
│   ├── 📁 src/
│   │   ├── 📁 controllers/      # API controllers
│   │   ├── 📁 routes/          # API routes
│   │   ├── 📁 middleware/      # Express middleware
│   │   └── index.ts            # Main server file
│   ├── 📁 prisma/              # Database schema and migrations
│   ├── 📁 utils/               # Utility functions
│   ├── package.json            # Backend dependencies
│   └── .env                    # Backend environment variables
├── 📁 front-end/               # Frontend (Next.js + TypeScript)
│   ├── 📁 src/
│   │   ├── 📁 app/             # Next.js app directory
│   │   │   ├── 📁 admin/       # Admin dashboard pages
│   │   │   ├── 📁 api/         # API routes
│   │   │   └── 📁 _components/ # Shared components
│   │   └── 📁 lib/             # Utility libraries
│   ├── 📁 prisma/              # Frontend Prisma client
│   ├── package.json            # Frontend dependencies
│   └── .env                    # Frontend environment variables
├── package.json                # Root package.json with scripts
├── README.md                   # This file
└── setup.sh                    # Setup script
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (NeonDB recommended)

### 1. Install All Dependencies

```bash
npm run install:all
```

### 2. Set Up Environment Variables

**Backend (.env in back-end/):**

```env
DATABASE_URL="postgresql://username:password@host:port/dbname?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5001
```

**Frontend (.env in front-end/):**

```env
NEXT_PUBLIC_API_URL="http://localhost:5001"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Or use migrations
npm run prisma:migrate
```

### 4. Start Development Servers

**Start both frontend and backend:**

```bash
npm run dev
```

**Start only backend:**

```bash
npm run backend
```

**Start only frontend:**

```bash
npm run frontend
```

## 🛠️ Available Scripts

### Root Level Scripts

- `npm run dev` - Start both frontend and backend
- `npm run backend` - Start only backend server
- `npm run frontend` - Start only frontend server
- `npm run install:all` - Install dependencies for all packages
- `npm run build` - Build both frontend and backend

### Database Scripts

- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Courses

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## 🗄️ Database Models

### User

- `id` - Unique identifier
- `email` - User email (unique)
- `password` - Hashed password
- `name` - User name
- `createdAt` - Account creation date
- `updatedAt` - Last update date

### Product

- `id` - Unique identifier
- `name` - Product name
- `price` - Product price
- `currency` - Price currency
- `imageUrl` - Product image URL
- `description` - Product description
- `category` - Product category
- `stock` - Available stock
- `materials` - Array of materials
- `dimensions` - Product dimensions (JSON)
- `createdAt` - Creation date

## 🔧 Development

### Backend Development

```bash
cd back-end
npm run dev
```

### Frontend Development

```bash
cd front-end
npm run dev
```

### Database Management

```bash
# View database in browser
npm run prisma:studio

# Reset database
cd back-end
npx prisma migrate reset
```

## 🚀 Deployment

### Backend Deployment

1. Set production environment variables
2. Run `npm run build` in back-end/
3. Deploy to your hosting service

### Frontend Deployment

1. Set production environment variables
2. Run `npm run build` in front-end/
3. Deploy to Vercel, Netlify, or your preferred hosting

## 📝 Environment Variables

### Backend (.env)

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret-key"
PORT=5001
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL="http://localhost:5001"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Port 5000 already in use:**

- Change PORT in back-end/.env to 5001
- Or kill the process using port 5000

**Database connection issues:**

- Check your DATABASE_URL in back-end/.env
- Ensure your database is running
- Run `npm run prisma:generate` to regenerate client

**Frontend can't connect to backend:**

- Ensure backend is running on correct port
- Check NEXT_PUBLIC_API_URL in frontend/.env
- Verify CORS settings in backend

**Prisma client not found:**

- Run `npm run prisma:generate` in back-end/
- Check import paths in your code
