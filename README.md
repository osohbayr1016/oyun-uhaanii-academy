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

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Oyun-Uhaanii-Academy
```

2. **Install dependencies**

```bash
npm run install:all
```

3. **Set up environment variables**

```bash
# Backend (.env in back-end/):
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5001

# Frontend (.env.local in front-end/):
NEXT_PUBLIC_API_URL="http://localhost:5001"
```

4. **Set up database**

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Or use migrations
npm run prisma:migrate
```

5. **Start development servers**

```bash
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## 🧪 Testing

### Run All Tests

```bash
# Run complete test suite
./test-runner.sh

# Or use npm scripts
npm test
```

### Individual Test Commands

```bash
# Backend tests only
npm run test:backend

# Frontend tests only
npm run test:frontend

# Tests with coverage
npm run test:coverage

# Type checking
npm run type-check

# Linting
npm run lint
```

### Test Coverage

- Backend: Authentication, CRUD operations, error handling
- Frontend: Component rendering, user interactions, form validation

## 🏗️ Build & Deployment

### Build Applications

```bash
npm run build
```

### Deployment Readiness

Before deploying, ensure:

1. All tests pass: `npm test`
2. TypeScript compilation successful: `npm run type-check`
3. Linting passed: `npm run lint`
4. Build successful: `npm run build`

See [DEPLOYMENT_READINESS.md](./DEPLOYMENT_READINESS.md) for detailed deployment guide.

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
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

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

## Troubleshooting

### Backend Port Already in Use (EADDRINUSE)

If you see an error like:

```
Error: listen EADDRINUSE: address already in use :::5001
```

This means something is already running on port 5001. The backend now automatically kills any process on port 5001 before starting, so you should not see this error. If you do, you can manually run:

```
fuser -k 5001/tcp || true
```

Then start the backend again:

```
npm run start
```

## 📞 Support

For issues and questions:

1. Check the troubleshooting section
2. Review the deployment guide
3. Check existing GitHub issues
4. Create a new issue with detailed information

---

**Happy coding! 🎮**

## Database Storage Management Best Practices

1. **Enable Neon/Cloud DB Alerts:**

   - Go to your Neon dashboard → Project → Usage/Monitoring → Set up alerts for storage thresholds (e.g., 70%, 90%).

2. **Regularly Clean Up Old Data:**

   - Use the provided script: `back-end/scripts/cleanupOldData.ts` to delete notifications and activities older than 90 days.
   - Run manually: `cd back-end && npx ts-node scripts/cleanupOldData.ts`
   - (Optional) Schedule with a cron job for automation.

3. **Monitor Table Sizes:**

   - Use the following SQL to check which tables use the most space:
     ```sql
     SELECT
       relname AS table_name,
       pg_size_pretty(pg_total_relation_size(relid)) AS total_size
     FROM pg_catalog.pg_statio_user_tables
     ORDER BY pg_total_relation_size(relid) DESC;
     ```

4. **Move Large Files to Object Storage:**

   - Store only file URLs in the database, not the files themselves.

5. **Prune Old Backups:**
   - Ensure your cloud DB is set to prune old backups automatically.

---
