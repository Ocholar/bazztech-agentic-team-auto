# Railway n8n Deployment Guide for Bazztech Agentic Team

**Project**: Bazztech n8n Agentic Team  
**Platform**: Railway  
**Deployment Time**: ~5 minutes  
**Cost**: Free tier (with $5 monthly credit)  
**Date**: November 20, 2025

---

## Overview

This guide provides step-by-step instructions to deploy n8n on Railway and configure it for the Bazztech Agentic Team workflows. Railway offers a managed n8n service with PostgreSQL database, automatic SSL, and public webhook URLs.

---

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app) (free tier available)
2. **GitHub Account**: For Railway authentication
3. **Dashboard API URL**: Your Manus dashboard deployment URL (from checkpoint `4b49abc9`)

---

## Step 1: Deploy n8n on Railway

### 1.1 Access the n8n Template

1. Navigate to [https://railway.com/deploy/n8n](https://railway.com/deploy/n8n)
2. Click **"Deploy Now"** button
3. Sign in with GitHub if not already logged in

### 1.2 Configure the Deployment

Railway will automatically create two services:
- **n8n**: The main workflow automation service
- **Postgres**: PostgreSQL database for persistence

**Default Configuration**:
- Port: `5678`
- Database: Managed PostgreSQL (automatically connected)
- Public URL: Auto-generated (e.g., `https://n8n-production-xxxx.up.railway.app`)

### 1.3 Wait for Deployment

- Railway will build and deploy the n8n instance (takes ~2-3 minutes)
- Monitor the deployment logs in the Railway dashboard
- Once deployed, you'll see a green checkmark and "Just deployed" status

---

## Step 2: Configure Environment Variables

### 2.1 Access Environment Variables

1. In Railway dashboard, click on the **n8n service**
2. Navigate to the **Variables** tab
3. Add the following environment variables:

### 2.2 Required Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `N8N_HOST` | `0.0.0.0` | Allow external connections |
| `N8N_PORT` | `5678` | Default n8n port |
| `N8N_PROTOCOL` | `https` | Use HTTPS for Railway public URL |
| `WEBHOOK_URL` | `https://your-n8n-url.up.railway.app/` | Replace with your Railway public URL |
| `N8N_EDITOR_BASE_URL` | `https://your-n8n-url.up.railway.app` | Same as WEBHOOK_URL without trailing slash |
| `GENERIC_TIMEZONE` | `Africa/Nairobi` | Kenya timezone |
| `N8N_ENCRYPTION_KEY` | `[Generate random 32-char string]` | Encryption key for credentials |

### 2.3 Database Environment Variables (Auto-Configured)

Railway automatically sets these variables when you deploy the template:
- `DB_TYPE=postgresdb`
- `DB_POSTGRESDB_HOST` (auto-set by Railway)
- `DB_POSTGRESDB_USER` (auto-set by Railway)
- `DB_POSTGRESDB_PASSWORD` (auto-set by Railway)
- `DB_POSTGRESDB_DATABASE` (auto-set by Railway)

### 2.4 Optional Environment Variables for Bazztech Integration

| Variable | Value | Description |
|----------|-------|-------------|
| `DASHBOARD_API_URL` | `https://3000-ilmh2gwtz732qy0hy5dso-4229c999.manusvm.computer/api/trpc` | Your Manus dashboard tRPC endpoint |
| `MANUS_LLM_API_URL` | `[From Manus environment]` | Manus built-in LLM API URL |
| `MANUS_LLM_API_KEY` | `[From Manus environment]` | Manus built-in LLM API key |

---

## Step 3: Access n8n Dashboard

### 3.1 Get Your Public URL

1. In Railway dashboard, click on the **n8n service**
2. Navigate to the **Settings** tab
3. Find the **Public Networking** section
4. Copy the **Public URL** (e.g., `https://n8n-production-xxxx.up.railway.app`)

### 3.2 First-Time Setup

1. Open the public URL in your browser
2. Create your n8n account:
   - **Email**: Your email address
   - **Password**: Strong password (save this securely)
   - **First Name**: Your first name
   - **Last Name**: Your last name
3. Click **"Get started"**

### 3.3 Verify Installation

1. You should see the n8n dashboard
2. Click on **"Workflows"** in the left sidebar
3. Confirm you can create a new workflow

---

## Step 4: Configure Webhook URL

### 4.1 Update WEBHOOK_URL Variable

1. Go back to Railway dashboard
2. Click on the **n8n service**
3. Navigate to **Variables** tab
4. Find `WEBHOOK_URL` variable
5. Update it to your actual Railway public URL: `https://n8n-production-xxxx.up.railway.app/`
6. Click **"Save"**

### 4.2 Restart n8n Service

1. In Railway dashboard, click on the **n8n service**
2. Click the **"Restart"** button (three dots menu → Restart)
3. Wait for the service to restart (~30 seconds)

---

## Step 5: Test Webhook Functionality

### 5.1 Create a Test Workflow

1. In n8n dashboard, click **"+ New Workflow"**
2. Add a **Webhook** node:
   - Click **"Add node"** → **"On app event"** → **"Webhook"**
   - Set **HTTP Method**: `POST`
   - Set **Path**: `test`
   - Click **"Execute Node"** to activate the webhook
3. Copy the **Test URL** (e.g., `https://n8n-production-xxxx.up.railway.app/webhook-test/test`)

### 5.2 Test the Webhook

1. Open a new terminal or use a tool like Postman
2. Send a POST request to the test URL:
   ```bash
   curl -X POST https://n8n-production-xxxx.up.railway.app/webhook-test/test \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```
3. Verify that the webhook node receives the data in n8n

### 5.3 Save the Workflow

1. Click **"Save"** in the top-right corner
2. Name the workflow: `Test Webhook`
3. Activate the workflow (toggle switch in top-right)

---

## Step 6: Configure Credentials for Dashboard API

### 6.1 Add HTTP Request Credentials

1. In n8n dashboard, click **"Credentials"** in the left sidebar
2. Click **"+ New Credential"**
3. Search for **"HTTP Request"** and select it
4. Configure the credential:
   - **Name**: `Bazztech Dashboard API`
   - **Authentication**: `Generic Credential Type`
   - **Generic Auth Type**: `Header Auth`
   - **Name**: `Content-Type`
   - **Value**: `application/json`
5. Click **"Save"**

---

## Step 7: Verify Database Connection

### 7.1 Check PostgreSQL Service

1. In Railway dashboard, click on the **Postgres service**
2. Navigate to the **Data** tab
3. Verify that the database is running and accessible

### 7.2 Verify n8n Database Tables

1. In n8n dashboard, create a simple workflow
2. Save it
3. Go back to Railway dashboard → Postgres service → Data tab
4. You should see n8n tables created (e.g., `workflow_entity`, `execution_entity`)

---

## Step 8: Configure Persistent Storage (Optional)

Railway automatically provides persistent storage for the PostgreSQL database. However, if you want to ensure data persistence for n8n's file storage:

1. In Railway dashboard, click on the **n8n service**
2. Navigate to the **Volumes** tab
3. Click **"+ New Volume"**
4. Set **Mount Path**: `/home/node/.n8n`
5. Click **"Add"**

---

## Step 9: Set Up Custom Domain (Optional)

If you want to use a custom domain instead of the Railway-generated URL:

### 9.1 Add Custom Domain in Railway

1. In Railway dashboard, click on the **n8n service**
2. Navigate to the **Settings** tab
3. Scroll to **Custom Domain** section
4. Click **"+ Add Domain"**
5. Enter your domain (e.g., `n8n.bazztech.com`)

### 9.2 Configure DNS

1. Go to your domain registrar (e.g., Cloudflare, GoDaddy)
2. Add a **CNAME record**:
   - **Name**: `n8n` (or your subdomain)
   - **Value**: Your Railway public URL (without `https://`)
   - **TTL**: Auto or 300
3. Wait for DNS propagation (~5-15 minutes)

### 9.3 Update Environment Variables

1. Update `WEBHOOK_URL` to your custom domain: `https://n8n.bazztech.com/`
2. Update `N8N_EDITOR_BASE_URL` to your custom domain: `https://n8n.bazztech.com`
3. Restart the n8n service

---

## Step 10: Security Best Practices

### 10.1 Enable Two-Factor Authentication (2FA)

1. In n8n dashboard, click on your profile (bottom-left)
2. Go to **Settings** → **Security**
3. Enable **Two-Factor Authentication**
4. Scan the QR code with your authenticator app

### 10.2 Restrict Access by IP (Optional)

If you want to restrict access to n8n dashboard:

1. Use Railway's **Private Networking** feature
2. Or set up a reverse proxy with IP whitelisting

### 10.3 Secure Credentials

1. Never hardcode credentials in workflows
2. Always use n8n's **Credentials** feature
3. Enable **Credential Encryption** (already enabled by default with `N8N_ENCRYPTION_KEY`)

---

## Step 11: Monitor and Maintain

### 11.1 Monitor Railway Logs

1. In Railway dashboard, click on the **n8n service**
2. Navigate to the **Deployments** tab
3. Click on the latest deployment to view logs
4. Monitor for errors or warnings

### 11.2 Set Up Alerts (Optional)

1. In Railway dashboard, go to **Project Settings**
2. Navigate to **Notifications**
3. Add your email or Slack webhook for deployment alerts

### 11.3 Update n8n (When New Versions Are Released)

Railway automatically uses the latest n8n Docker image. To update:

1. In Railway dashboard, click on the **n8n service**
2. Navigate to the **Settings** tab
3. Click **"Redeploy"** to pull the latest image

---

## Troubleshooting

### Issue: Cannot Access n8n Dashboard

**Solution**:
1. Check that the n8n service is running (green checkmark in Railway)
2. Verify `N8N_HOST` is set to `0.0.0.0`
3. Check Railway logs for errors

### Issue: Webhooks Not Working

**Solution**:
1. Verify `WEBHOOK_URL` is set correctly (with trailing slash)
2. Ensure the workflow is activated (toggle switch is ON)
3. Check that the webhook path is correct

### Issue: Database Connection Errors

**Solution**:
1. Verify PostgreSQL service is running
2. Check that database environment variables are auto-set by Railway
3. Restart both n8n and Postgres services

### Issue: Workflows Not Saving

**Solution**:
1. Check PostgreSQL database is running
2. Verify persistent storage is configured
3. Check Railway logs for database errors

---

## Next Steps

Now that n8n is deployed on Railway, proceed to:

1. **Import Workflow JSON Files**: Import the three core workflows (Lead Generation, Lead Qualification, Form Submission)
2. **Configure Credentials**: Set up credentials for WhatsApp, LinkedIn, Google Maps, etc.
3. **Test Workflows**: Run each workflow manually to verify functionality
4. **Activate Workflows**: Enable all workflows to run on schedule

Refer to the **n8n Workflow Configuration Guide** (next document) for detailed instructions on importing and configuring the workflows.

---

## Summary

You have successfully deployed n8n on Railway with:
- ✅ Public HTTPS URL with automatic SSL
- ✅ PostgreSQL database for persistence
- ✅ Webhook functionality for external integrations
- ✅ Environment variables configured for Bazztech integration
- ✅ Secure credential storage with encryption

**Your n8n Instance**:
- **URL**: `https://n8n-production-xxxx.up.railway.app` (replace with your actual URL)
- **Database**: Managed PostgreSQL on Railway
- **Cost**: Free tier (with $5 monthly credit)
- **Uptime**: 99%+ (Railway SLA)

---

**Document Version**: 1.0  
**Last Updated**: November 20, 2025  
**Author**: Manus AI  
**Project**: Bazztech n8n Agentic Team
