import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { bazzRequest } from '../lib/api';

interface DiagnosticResult {
    status: 'pass' | 'fail' | 'warn';
    message?: string;
}

interface DoctorResponse {
    openai: DiagnosticResult;
    jenga: DiagnosticResult;
    daraja: DiagnosticResult;
    n8n: DiagnosticResult;
    database: DiagnosticResult;
}

export const doctorCommand = new Command('doctor')
    .description('Check the health and configuration of your BazzAI tenant')
    .action(async () => {
        const spinner = ora('Running BazzAI health checks...').start();

        try {
            const res = await bazzRequest('/api/cli/doctor');
            const data = (await res.json()) as DoctorResponse;
            spinner.stop();

            console.log(chalk.bold('\n--- BazzAI Health Report ---\n'));

            const statusIcon = (status: string) => {
                if (status === 'pass') return chalk.green('✔');
                if (status === 'fail') return chalk.red('✘');
                return chalk.yellow('⚠');
            };

            const formatLine = (label: string, result: { status: string; message?: string }) => {
                const icon = statusIcon(result.status);
                const msg = result.message ? ` (${result.message})` : '';
                console.log(`${icon} ${chalk.bold(label.padEnd(12))} : ${result.status.toUpperCase()}${msg}`);
            };

            formatLine('OpenAI', data.openai);
            formatLine('Jenga API', data.jenga);
            formatLine('Daraja', data.daraja);
            formatLine('n8n', data.n8n);
            formatLine('Database', data.database);

            const hasFailures = Object.values(data).some((r: any) => r.status === 'fail');

            if (hasFailures) {
                console.log(chalk.red('\nSome checks failed. Please verify your ProductConfig in the dashboard.'));
            } else {
                console.log(chalk.green('\nAll systems go! Your BazzAI tenant is healthy.'));
            }

        } catch (error: any) {
            spinner.fail(`Doctor failed: ${error.message}`);
            process.exit(1);
        }
    });
