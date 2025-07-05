# Backend Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database (or any database supported by Prisma)
- Environment variables configured

## Environment Variables

Create a `.env` file in the backend root with:

```
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret_key"
PORT=5001
```

## Deployment Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

### 3. Run Database Migrations

```bash
npm run prisma:push
```

### 4. Build the Application

```bash
npm run build
```

### 5. Start the Server

```bash
npm start
```

## Deployment Platforms

### Render

1. Connect your GitHub repository
2. Set build command: `npm install && npm run build`
3. Set start command: `npm start`
4. Add environment variables in Render dashboard

### Railway

1. Connect your GitHub repository
2. Railway will automatically detect Node.js
3. Add environment variables in Railway dashboard
4. Deploy

### Heroku

1. Create a new Heroku app
2. Connect your GitHub repository
3. Add environment variables in Heroku dashboard
4. Deploy

### Vercel (Serverless Functions)

1. Create `api/` folder in your project
2. Move backend code to `api/` folder
3. Deploy to Vercel

## Production Considerations

1. **Environment Variables**: Ensure all sensitive data is in environment variables
2. **Database**: Use a production database (not SQLite)
3. **CORS**: Configure CORS for your frontend domain
4. **Rate Limiting**: Consider adding rate limiting middleware
5. **Logging**: Add proper logging for production
6. **Error Handling**: Ensure proper error handling

## API Endpoints

- `GET /` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `GET /api/tournaments` - Get all tournaments
- `POST /api/tournaments` - Create tournament
- `GET /api/news` - Get all news
- `POST /api/news` - Create news

## Troubleshooting

### Common Issues:

1. **Prisma Client not found**: Run `npm run prisma:generate`
2. **Database connection failed**: Check DATABASE_URL in environment variables
3. **Port already in use**: Change PORT in environment variables
4. **TypeScript errors**: Ensure all dependencies are installed
