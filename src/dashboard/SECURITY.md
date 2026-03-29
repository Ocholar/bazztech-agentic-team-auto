# BazzAI Platform Security Model

## Overview

BazzAI utilizes a defense-in-depth security model built for a multi-tenant SaaS environment. The platform prioritizes tenant data isolation, protection against Insecure Direct Object Reference (IDOR), and cryptographic resilience for financial APIs.

## Authentication Layer (Edge & App)

- **Middleware:** `src/middleware.ts` employs NextAuth JWT token verification to protect the entire `/portal` workspace boundary at the edge computing layer. Unauthenticated access is preemptively bounced.
- **Session:** Verified natively via NextAuth `auth()` within Server Components and Server Actions.

## Authorization & IDOR Protection (Tenant Isolation)

- **Zod Validation:** All Server Actions enforce strict runtime schema validation using `zod`.
- **Explicit Ownership Assertions:** Server Actions (e.g., `saveProductConfig`, `saveApiKeys`) explicitly inject the `userId` into Prisma database queries.
- **Prevention:** This guarantees that even if a malicious actor acquires a UUID belonging to another tenant (`configId`), the transaction will be rejected securely.

## Cryptographic & API Identity (Equity Jenga)

- **RSA-SHA256 Signatures:** Requests mapping to the Equity Bank Jenga API (`src/lib/jenga.ts`) support the official RSA-SHA256 signature specification natively. The `crypto.createSign` utility is implemented to hash and sign account attributes securely.
- **Fail-Safe Mechanism:** Accommodates Jenga API v3 base64 token fallback securely for simpler API Key merchant configurations.

## Traffic Shaping & DDoS Protection

- **Rate Limiting:** Global rate limiters (`src/lib/rate-limiter.ts`) throttle incoming webhook and API routes.
- **Limits:**
  - WhatsApp Ingress (`/api/webhook/whatsapp`): 100 requests / min.
  - Jenga Status Check (`/api/jenga/check-status`): 30 requests / min.

## Auditing & Monitoring

- **Structured Logger:** `src/lib/logger.ts` guarantees that production error, warning, and info states are standardized as stringified JSON objects. This accommodates instant bridging to Datadog or LogRocket.
