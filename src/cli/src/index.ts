#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand, initTokenCommand } from './commands/init';
import { chatCommand } from './commands/chat';
import { monitorCommand } from './commands/monitor';
import { toolRunCommand } from './commands/tool-run';

const program = new Command();

program
    .name('bazz')
    .description('BazzAI Terminal Agent CLI')
    .version('0.1.0');

program.addCommand(initCommand);
program.addCommand(initTokenCommand);
program.addCommand(chatCommand);
program.addCommand(monitorCommand);
program.addCommand(toolRunCommand);

program.parse(process.argv);
