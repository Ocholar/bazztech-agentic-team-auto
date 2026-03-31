import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { bazzRequest } from '../lib/api';

export const toolRunCommand = new Command('tool-run')
    .description('Execute a BazzAI modular tool directly from the terminal')
    .argument('<toolName>', 'Kebab-case name of the tool (e.g., jenga-poll)')
    .option('-i, --input <string>', 'JSON string of input arguments', '{}')
    .action(async (toolName, options) => {
        let inputArgs;
        const spinner = ora(`Executing ${toolName}...`).start();

        try {
            inputArgs = JSON.parse(options.input);
        } catch (err) {
            spinner.fail('Invalid JSON passed to --input');
            process.exit(1);
        }

        try {
            const res = await bazzRequest(`/api/cli/tools/${toolName}`, 'POST', inputArgs);
            const data = (await res.json()) as any;

            if (res.status === 202 && data.pendingApproval) {
                spinner.warn(chalk.yellow(`HITL Gate Activated: Tool execution paused.`));
                console.log(chalk.gray(`AuditLog ID: ${data.auditLogId}`));
                console.log(`Awaiting human approval via BazzAI Portal.`);
                process.exit(0);
            }

            if (!res.ok || !data.success) {
                spinner.fail(chalk.red(`Tool Failed: ${data.error}`));
                process.exit(1);
            }

            spinner.succeed(`Tool executed successfully.`);
            console.log('\n' + chalk.cyan('Result:'));
            console.log(JSON.stringify(data.data, null, 2));

        } catch (err: any) {
            spinner.fail('Error calling tool endpoint: ' + err.message);
            process.exit(1);
        }
    });
