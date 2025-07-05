# 🚀 Quick Start Guide

## ⚡ Get Started in 5 Minutes

### 1. Install Dependencies

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

**Frontend (.env.local in front-end/):**

```env
NEXT_PUBLIC_API_URL="http://localhost:5001"
```

### 3. Set Up Database

```bash
npm run prisma:generate
npm run prisma:push
```

### 4. Start Development

```bash
npm run dev
```

## 🌐 Access Your Application

- **Frontend**: http://localhost:3002 (or 3000 if available)
- **Backend API**: http://localhost:5001
- **Admin Dashboard**: http://localhost:3002/admin
- **Prisma Studio**: Run `npm run prisma:studio`

## 📋 Available Commands

| Command                   | Description                     |
| ------------------------- | ------------------------------- |
| `npm run dev`             | Start both frontend and backend |
| `npm run backend`         | Start only backend server       |
| `npm run frontend`        | Start only frontend server      |
| `npm run install:all`     | Install all dependencies        |
| `npm run prisma:generate` | Generate Prisma client          |
| `npm run prisma:push`     | Push schema to database         |
| `npm run prisma:studio`   | Open database browser           |

## 🔧 Troubleshooting

### Port Issues

- If port 3000 is busy, frontend will use 3002
- If port 5000 is busy, backend will use 5001

### Database Issues

- Check your DATABASE_URL in back-end/.env
- Run `npm run prisma:generate` to regenerate client

### Frontend Can't Connect

- Ensure backend is running on correct port
- Check NEXT_PUBLIC_API_URL in frontend/.env

## 📁 Project Structure

```
Oyun-Uhaanii-Academy/
├── 📁 back-end/          # Backend API (Port 5001)
├── 📁 front-end/         # Frontend App (Port 3002)
├── 📄 package.json       # Root scripts
└── 📄 README.md          # Full documentation
```

## 🎯 Next Steps

1. **Explore the Admin Dashboard**: http://localhost:3002/admin
2. **Add Products**: Use the admin interface
3. **Create Courses**: Set up educational content
4. **Customize Design**: Modify components in front-end/src/app/\_components/
5. **Add Features**: Extend the API in back-end/src/

## 📞 Need Help?

- Check the full README.md for detailed documentation
- Review PROJECT_STRUCTURE.md for architecture details
- Run `npm run` to see all available commands
