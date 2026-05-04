# BazzAI Platform — Connected Manufacturing Intelligence

BazzAI is a premium AI-driven operations platform built for African manufacturing. It provides real-time machine analytics, predictive maintenance alerts, and inventory forecasting using a Hybrid RAG architecture.

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- PostgreSQL
- Upstash Redis (for rate limiting)
- OpenAI API Key

### 2. Installation

```bash
npm install
npx playwright install
```

### 3. Environment Setup

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://..."
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
OPENAI_API_KEY="..."
N8N_RAG_WEBHOOK_URL="..."
```

### 4. Development

```bash
npx prisma generate
npm run dev
```

## 🧪 Testing

### Unit Tests (Vitest)

Tests for AI classification logic and core utilities.

```bash
npm test
```

### E2E Tests (Playwright)

Validates the critical user journey (Hero → AI Demo → ROI → Register).

```bash
npx playwright test
```

## 🏗️ Architecture

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **AI Engine**: Hybrid RAG (GPT-4o + Pinecone Vector DB)
- **Orchestration**: n8n for workflow automation
- **Styling**: Vanilla CSS + Glassmorphism
