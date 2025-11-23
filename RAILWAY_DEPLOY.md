# Railway Deployment Guide

## Prerequisites
- GitHub account connected to Railway
- Railway account (free tier available)

## Step 1: Deploy Dashboard
1. Visit [railway.app/new](https://railway.app/new)
2. Click **"Deploy from GitHub repo"**
3. Select `Ocholar/bazztech-agentic-team-auto`
4. Railway will auto-detect the Next.js app in `src/dashboard`
5. Click **"Deploy Now"**

## Step 2: Add PostgreSQL Database
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically provision a database
4. Copy the `DATABASE_URL` connection string

## Step 3: Configure Environment Variables
1. Go to your Dashboard service settings
2. Add environment variable:
   ```
   DATABASE_URL=<paste from PostgreSQL service>
   ```
3. Redeploy the service

## Step 4: Run Database Migration
1. In Railway, go to your Dashboard service
2. Click **"Settings"** → **"Deploy"** → **"Custom Start Command"**
3. Set to:
   ```bash
   npx prisma migrate deploy && npm start
   ```
4. Redeploy

## Step 5: Deploy n8n (Optional)
1. In the same Railway project, click **"+ New"**
2. Select **"Docker Image"**
3. Use image: `docker.n8n.io/n8nio/n8n`
4. Add environment variables:
   ```
   N8N_HOST=<your-n8n-url>.railway.app
   N8N_PROTOCOL=https
   WEBHOOK_URL=<your-dashboard-url>.railway.app/api/webhook
   ```
5. Deploy

## Step 6: Import n8n Workflows
1. Access your n8n instance at `https://<project-name>.railway.app`
2. Go to **"Workflows"** → **"Import from File"**
3. Import each JSON file from `inbox/bazztech_agentic_team/workflows/`

## Step 7: Verify
1. Visit your Dashboard at `https://<dashboard-url>.railway.app`
2. Check that KPIs are visible
3. Test the webhook by triggering a workflow in n8n

## Cost Estimate
- **Dashboard**: $5/month (after free tier)
- **PostgreSQL**: Free (500 MB storage)
- **n8n**: $5/month
- **Total**: ~$10/month

## One-Click Cleanup
To delete the entire stack:
1. Go to Railway project settings
2. Click **"Delete Project"**
3. Confirm deletion
