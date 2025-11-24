# Airtel Form Submitter Service

Automated service for submitting qualified leads to Airtel's 5G SmartConnect form.

## Features

- ✅ Fetches QUALIFIED leads from dashboard every 5 minutes
- ✅ Automatically fills and submits the Airtel form using browser automation
- ✅ Updates dashboard with submission results
- ✅ Resilient selector strategies to handle form changes
- ✅ Batch processing with rate limiting

## Environment Variables

- `DASHBOARD_URL`: URL of your dashboard API (default: https://bazztech-agentic-team-auto-production-047d.up.railway.app)
- `CHECK_INTERVAL`: Cron schedule for checking leads (default: `*/5 * * * *` - every 5 minutes)

## Agent Configuration

The service is pre-configured with your agent details:
- Agent Type: Enterprise
- Enterprise CP: Bazztech Networks  
- Agent Name: Reagan Ochola
- Agent Mobile: 254781751937

## How It Works

1. Every 5 minutes, the service queries `/api/leads/qualified`
2. For each qualified lead:
   - Opens Airtel form in headless browser
   - Fills Page 1 (Agent details)
   - Fills Page 2 (Work order)
   - Fills Page 3 (Customer details)
   - Submits the form
   - Updates dashboard via `/api/webhook`
3. Waits 10 seconds between submissions to avoid rate limiting

## Deployment to Railway

1. Push this code to your GitHub repo
2. Create a new service in Railway
3. Select "Deploy from GitHub repo"
4. Choose the `airtel-submitter` directory
5. Railway will auto-detect the Dockerfile and deploy

## Local Testing

```bash
cd airtel-submitter
npm install
npm start
```

## Logs

The service provides detailed logging:
- 🚀 Service startup
- 📬 Qualified leads found
- 📝 Form filling progress
- ✅ Successful submissions
- ❌ Errors with details
- 📊 Dashboard updates
