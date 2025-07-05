# Oyun Uhaanii Academy - Deployment Guide

## Overview

This is a full-stack application with a Next.js frontend and Express.js backend with PostgreSQL database.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Git
- PM2 (for production process management)

## Project Structure

```
Oyun-Uhaanii-Academy/
├── back-end/          # Express.js API server
├── front-end/         # Next.js frontend
├── package.json       # Root package.json with scripts
└── README.md
```

## Environment Setup

### Backend Environment Variables

Create `back-end/.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/oyun_uhaanii_academy"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server
PORT=5001

# Environment
NODE_ENV="production"
```

### Frontend Environment Variables

Create `front-end/.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5001

# Environment
NODE_ENV=production
```

## Database Setup

1. **Install PostgreSQL** and create a database:

```sql
CREATE DATABASE oyun_uhaanii_academy;
```

2. **Run Prisma migrations**:

```bash
cd back-end
npx prisma migrate deploy
npx prisma generate
```

3. **Seed the database** (optional):

```bash
npx prisma db seed
```

## Local Development

1. **Install dependencies**:

```bash
npm run install:all
```

2. **Start both servers**:

```bash
npm run dev
```

This will start:

- Backend on http://localhost:5001
- Frontend on http://localhost:3000

## Production Deployment

### Option 1: Vercel (Recommended for Frontend)

#### Frontend Deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
4. Deploy

#### Backend Deployment on Railway/Render:

1. Push your code to GitHub
2. Connect to Railway or Render
3. Set environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: "production"
4. Deploy

### Option 2: Traditional VPS Deployment

#### Server Setup:

1. **Install Node.js and PM2**:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pm2
```

2. **Install PostgreSQL**:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

3. **Setup PostgreSQL**:

```bash
sudo -u postgres psql
CREATE DATABASE oyun_uhaanii_academy;
CREATE USER academy_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE oyun_uhaanii_academy TO academy_user;
\q
```

#### Application Deployment:

1. **Clone and setup**:

```bash
git clone <your-repo>
cd Oyun-Uhaanii-Academy
npm run install:all
```

2. **Build applications**:

```bash
npm run build
```

3. **Setup environment variables**:

```bash
# Backend
cp back-end/.env.example back-end/.env
# Edit back-end/.env with your values

# Frontend
cp front-end/.env.example front-end/.env.local
# Edit front-end/.env.local with your values
```

4. **Start with PM2**:

```bash
# Start backend
cd back-end
pm2 start dist/src/index.js --name "academy-backend"

# Start frontend
cd ../front-end
pm2 start npm --name "academy-frontend" -- start
```

5. **Setup PM2 to start on boot**:

```bash
pm2 startup
pm2 save
```

### Option 3: Docker Deployment

#### Create Dockerfile for Backend:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]
```

#### Create Dockerfile for Frontend:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Compose:

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: oyun_uhaanii_academy
      POSTGRES_USER: academy_user
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./back-end
    environment:
      DATABASE_URL: postgresql://academy_user:your_password@postgres:5432/oyun_uhaanii_academy
      JWT_SECRET: your-super-secret-jwt-key
      NODE_ENV: production
    ports:
      - "5001:5001"
    depends_on:
      - postgres

  frontend:
    build: ./front-end
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:5001
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

## SSL/HTTPS Setup

### Using Nginx as Reverse Proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring and Maintenance

### PM2 Commands:

```bash
# View logs
pm2 logs

# Monitor processes
pm2 monit

# Restart applications
pm2 restart academy-backend
pm2 restart academy-frontend

# Update application
git pull
npm run build
pm2 restart all
```

### Database Backup:

```bash
# Create backup
pg_dump oyun_uhaanii_academy > backup.sql

# Restore backup
psql oyun_uhaanii_academy < backup.sql
```

## Security Checklist

- [ ] Change default JWT secret
- [ ] Use strong database passwords
- [ ] Enable HTTPS
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Database backups
- [ ] Environment variable security
- [ ] Input validation
- [ ] Rate limiting
- [ ] CORS configuration

## Troubleshooting

### Common Issues:

1. **Port conflicts**: Kill processes using ports 3000/5001
2. **Database connection**: Check DATABASE_URL format
3. **Build errors**: Clear node_modules and reinstall
4. **CORS issues**: Check backend CORS configuration
5. **Environment variables**: Ensure all required vars are set

### Debug Commands:

```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5001

# Check PM2 status
pm2 status

# View application logs
pm2 logs academy-backend
pm2 logs academy-frontend

# Test database connection
cd back-end
npx prisma db push
```

## Performance Optimization

1. **Enable compression** in backend
2. **Use CDN** for static assets
3. **Database indexing** for frequently queried fields
4. **Caching** for API responses
5. **Image optimization** in frontend
6. **Code splitting** in Next.js

## Support

For deployment issues, check:

- Application logs
- Database connection
- Environment variables
- Network connectivity
- Server resources
