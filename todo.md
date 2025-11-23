# Development Todo List

## Dashboard UI
- [x] **Layout Shell**: Create responsive sidebar and header layout.
- [x] **KPI Cards Component**: Display key metrics (Gross Adds, Leads, etc.).
- [x] **Leads Table Component**: Sortable/filterable table for leads.
- [x] **Submissions Log Component**: List view for form submission history.
- [x] **Configuration Form**: Settings page for agent parameters.
- [ ] **Analytics Charts**: Visualizations for trends (recharts or similar).

## Backend / API
- [x] **Database Schema**: Define Prisma/Drizzle schema for Leads, Submissions, Config.
- [x] **Seed Data**: Script to populate initial dummy data.
- [x] **API Routes**: tRPC or Next.js API routes to serve data to frontend.
- [x] **Webhook Endpoint**: Endpoint to receive updates from n8n.

## Integration
- [ ] **n8n Connection**: Verify n8n can hit the webhook endpoint.
- [ ] **Authentication**: Simple auth protection for the dashboard.
