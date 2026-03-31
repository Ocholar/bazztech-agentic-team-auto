import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import readline from 'readline';
import { loadSession } from '../lib/auth';
import { bazzRequest } from '../lib/api';

/**
 * Helper to get the tenant's ProductConfig and their openaiApiKey
 */
async function getTenantConfig() {
    const res = await bazzRequest('/api/cli/config');
    const data = (await res.json()) as any;
    return data.config;
}

export const chatCommand = new Command('chat')
    .description('Launch a terminal AI agent with full context of your BazzAI tenant')
    .action(async () => {
        try {
            const session = loadSession();
            console.log(chalk.blue('=== Bazz-CLI Terminal Agent ==='));
            console.log(chalk.gray(`Tenant: ${session.userId}\n`));

            const spinner = ora('Loading tenant context...').start();
            const config = await getTenantConfig();
            // Look up key from .bazzrc or env, falling back to what the user configures
            const openaiKey = process.env.OPENAI_API_KEY;

            if (!openaiKey) {
                spinner.fail('Missing OPENAI_API_KEY environment variable. The CLI agent requires this to chat.');
                process.exit(1);
            }

            spinner.succeed('Context loaded. Press Ctrl+C to exit.\n');

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                prompt: chalk.green('You: ')
            });

            // Maintain chat history
            const messages: any[] = [
                {
                    role: 'system',
                    content: `You are the Bazz-CLI Terminal Agent. You are assisting a developer managing their BazzAI tenant. The tenant's ProductType is ${config.productType}. Here is their custom systemic prompt from the dashboard: "${config.systemPrompt || 'No custom prompt set.'}"`
                }
            ];

            rl.prompt();

            rl.on('line', async (line) => {
                const input = line.trim();
                if (!input) {
                    rl.prompt();
                    return;
                }

                messages.push({ role: 'user', content: input });
                const thinkSpinner = ora('Thinking...').start();

                try {
                    // 1. Call OpenAI to get response + tool intentions
                    const res = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${openaiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            model: 'gpt-4o',
                            messages,
                            // For v1, we aren't registering the full tool-schemas here, 
                            // we just let the model chat. If the user wants to run a tool, they should use the `run` command.
                        })
                    });

                    if (!res.ok) throw new Error(await res.text());
                    const data: any = await res.json();
                    const reply = data.choices[0].message.content;

                    messages.push({ role: 'assistant', content: reply });

                    thinkSpinner.stop();
                    console.log(chalk.cyan('BazzAI: ') + reply + '\n');
                } catch (err: any) {
                    thinkSpinner.fail('Error communicating with AI: ' + err.message);
                }

                rl.prompt();
            });

        } catch (err: any) {
            console.error(chalk.red('\nError: ' + err.message));
            process.exit(1);
        }
    });
