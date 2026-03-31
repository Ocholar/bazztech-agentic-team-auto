import { Command } from 'commander';
import chalk from 'chalk';
import EventSource from 'eventsource';
import { loadSession } from '../lib/auth';

export const monitorCommand = new Command('monitor')
    .description('Stream real-time AuditLog events for your BazzAI tenant')
    .action(() => {
        try {
            const session = loadSession();
            console.log(chalk.blue('=== Bazz-CLI Monitor ==='));
            console.log(chalk.gray(`Tenant: ${session.userId}`));
            console.log(chalk.gray(`Connecting to: ${session.apiUrl}/api/cli/monitor\n`));

            const cliSecret = process.env.BAZZ_CLI_SECRET || 'bazz_internal_dev_secret_2026';

            const sse = new EventSource(`${session.apiUrl}/api/cli/monitor`, {
                headers: {
                    'x-cli-secret': cliSecret,
                    'x-user-id': session.userId,
                }
            });

            sse.onopen = () => {
                console.log(chalk.green('Connected to stream.\n'));
            };

            sse.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);

                    if (data.event === 'CONNECTED') {
                        return;
                    }

                    const time = chalk.gray(`[${new Date(data.createdAt).toLocaleTimeString()}]`);
                    const eventName = chalk.cyan(data.event);
                    const tool = data.toolName ? chalk.yellow(`(${data.toolName}) `) : '';

                    let prefix = '';
                    if (data.pendingApproval) {
                        prefix = chalk.bgYellow.black(' HITL PENDING ') + ' ';
                    }

                    console.log(`${time} ${prefix}${tool}${eventName}`);

                    if (data.detail) {
                        console.log(chalk.dim(`      ↳ ${data.detail}`));
                    }

                } catch (err) {
                    console.error(chalk.red('Failed to parse event:'), event.data);
                }
            };

            sse.onerror = (err) => {
                console.error(chalk.red('\nStream error or connection lost. Reconnecting...'));
            };

            process.on('SIGINT', () => {
                sse.close();
                console.log(chalk.yellow('\nMonitor stopped.'));
                process.exit(0);
            });

        } catch (err: any) {
            console.error(chalk.red('\nError: ' + err.message));
            process.exit(1);
        }
    });
