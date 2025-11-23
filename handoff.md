# Project Handoff: Bazztech Agentic Team

## 🚀 Mission Accomplished
The autonomous sales & marketing system has been successfully bootstrapped.

## 📂 Deliverables
- **Dashboard**: Next.js 14 App Router application (`src/dashboard`).
- **Automation**: n8n workflow configuration (`src/n8n`).
- **Database**: SQLite (dev) / PostgreSQL (prod ready) with Prisma ORM.
- **CI/CD**: GitHub Actions pipeline (`.github/workflows/ci.yml`).

## 🛠️ How to Run Locally
1. **Start the Stack**:
   ```bash
   cd project/src
   docker compose up
   ```
2. **Access the Dashboard**:
   Open [http://localhost:3000](http://localhost:3000)
3. **Access n8n**:
   Open [http://localhost:5678](http://localhost:5678)

## ☁️ Deployment (Railway)
1. **Push to GitHub**:
   ```bash
   # I have already initialized the repo and committed the code.
   # Just run this to push to your account:
   git push -u origin main
   ```
   *Target Repo*: [https://github.com/Ocholar/bazztech-agentic-team-auto](https://github.com/Ocholar/bazztech-agentic-team-auto)

2. Connect Railway to the repo.
3. Railway will automatically detect the `Dockerfile` in `src/dashboard`.
4. Add a PostgreSQL service in Railway.
5. Set `DATABASE_URL` in Railway variables.
6. Deploy!

## 📝 Documentation
- [Project Charter](../charter.md)
- [Todo List](../todo.md)
- [API Documentation](src/dashboard/src/app/api/webhook/route.ts)

## 🧹 Cleanup
To remove the local stack:
```bash
docker compose down -v
```
