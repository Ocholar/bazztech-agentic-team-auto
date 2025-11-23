# 🚨 Fix Your Deployment Crash

## The Problem
Your app is crashing because it's trying to connect to the **Dummy Database** we used for the build (`postgresql://dummy...`).
You need to tell it to use the **Real Database** you just created.

## The Solution (1 Minute)

1.  **Go to Railway**: Open your project.
2.  **Select the Dashboard Service**: Click on `bazztech-agentic-team-auto`.
3.  **Go to Variables**: Click the **"Variables"** tab.
4.  **Add Variable**:
    *   **Name**: `DATABASE_URL`
    *   **Value**: `${{Postgres.DATABASE_URL}}`
    *(Start typing `${{` and select the Postgres option from the list)*
5.  **Add Another Variable** (Optional but recommended):
    *   **Name**: `N8N_WEBHOOK_SECRET`
    *   **Value**: `bazztech-secret-key`

## Verify
Once you click **Add**, Railway will automatically restart the app.
This time, it will ignore the dummy URL and use the real one.
The "Crashed" status will turn into "Active" ✅.
