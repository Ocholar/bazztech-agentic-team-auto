# 🚀 Phase 2: Expose Dashboard & Deploy n8n

## Step 1: Expose the Dashboard (Get your URL)
Your dashboard is running but hidden. Let's make it public.

1.  Click on your **`bazztech-agentic-team-auto`** service.
2.  Click the **"Settings"** tab.
3.  Scroll down to **"Networking"**.
4.  Click **"Generate Domain"**.
5.  **Copy this URL** (e.g., `bazztech-production.up.railway.app`). You will need it for n8n.

## Step 2: Deploy n8n (The Brain)
We will deploy n8n as a separate service in the same project.

1.  Close the service view (click the **X** or click the canvas background).
2.  Click **"+ New"** (top right) → **"Volume"**.
    *   Name it `n8n-storage`.
3.  Click **"+ New"** → **"Docker Image"**.
4.  Image Name: `docker.n8n.io/n8nio/n8n`
5.  Press **Enter**.

## Step 3: Configure n8n
1.  Click the new **n8n** service.
2.  Go to **"Variables"**.
3.  Add these variables:
    *   `N8N_HOST` = `n8n-bazztech.up.railway.app` (We will generate this domain next)
    *   `N8N_PORT` = `5678`
    *   `N8N_PROTOCOL` = `https`
    *   `NODE_ENV` = `production`
    *   `WEBHOOK_URL` = `https://<YOUR_DASHBOARD_URL>/api/webhook` (Paste the URL from Step 1)
    *   `N8N_ENCRYPTION_KEY` = `bazztech-secret-key` (Or any random string)

## Step 4: Expose n8n & Connect Storage
1.  Go to **"Settings"** → **"Networking"** → **"Generate Domain"**.
    *   *Note: Make sure this matches the `N8N_HOST` you set above (without https://).*
2.  Go to **"Settings"** → **"Service"** → **"Volumes"**.
3.  Click **"Add Volume"**.
4.  Select `n8n-storage`.
5.  Mount Path: `/home/node/.n8n`.

## Step 5: Launch!
n8n will redeploy. Once "Active", open the n8n URL and set up your admin account.
