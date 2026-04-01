import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

// --- Auth Utilities ---
const CONFIG_PATH = path.join(os.homedir(), ".bazzrc");

interface BazzSession {
    userId: string;
    token: string;
    apiUrl: string;
}

function loadSession(): BazzSession {
    if (!fs.existsSync(CONFIG_PATH)) {
        throw new Error("Not authenticated. Please run `bazz init` from the CLI first.");
    }
    return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}

// --- MCP Server Implementation ---

const server = new Server(
    {
        name: "bazzai-mcp-server",
        version: "0.1.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

/**
 * Handler for listing available BazzAI tools.
 * Fetches the registry from the BazzAI Dashboard API.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
    try {
        const session = loadSession();
        const cliSecret = process.env.INTERNAL_CLI_SECRET || "bazz_internal_dev_secret_2026";

        const res = await fetch(`${session.apiUrl}/api/cli/tools`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.token}`,
                "x-cli-secret": cliSecret,
                "x-user-id": session.userId,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch BazzAI tools: ${res.statusText}`);
        }

        const tools = (await res.json()) as any[];

        return {
            tools: tools.map((t) => ({
                name: t.name,
                description: t.description,
                inputSchema: t.inputSchema,
            })),
        };
    } catch (error: any) {
        console.error("[mcp] listTools error:", error);
        return { tools: [] };
    }
});

/**
 * Handler for calling a BazzAI tool.
 * Proxies the request to the BazzAI Dashboard API.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        const session = loadSession();
        const cliSecret = process.env.INTERNAL_CLI_SECRET || "bazz_internal_dev_secret_2026";

        const res = await fetch(`${session.apiUrl}/api/cli/tools/${name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.token}`,
                "x-cli-secret": cliSecret,
                "x-user-id": session.userId,
            },
            body: JSON.stringify(args),
        });

        const data = (await res.json()) as any;

        if (!res.ok) {
            return {
                content: [{ type: "text", text: `Error: ${data.error || res.statusText}` }],
                isError: true,
            };
        }

        // Handle HITL Pending status
        if (data.pendingApproval) {
            return {
                content: [{
                    type: "text",
                    text: `Tool execution paused. Approval required in BazzAI Dashboard or WhatsApp (AuditLog ID: ${data.auditLogId})`
                }],
            };
        }

        return {
            content: [{ type: "text", text: JSON.stringify(data.result || data.summary || data, null, 2) }],
        };
    } catch (error: any) {
        console.error(`[mcp] callTool error (${name}):`, error);
        return {
            content: [{ type: "text", text: `Internal MCP Error: ${error.message}` }],
            isError: true,
        };
    }
});

/**
 * Start the server using stdio transport.
 */
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("BazzAI MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in BazzAI MCP Server:", error);
    process.exit(1);
});
