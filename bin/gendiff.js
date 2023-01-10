#!/usr/bin/env node

import { Command } from 'commander';
import printDifferences from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('-V, --version')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console
    .log(printDifferences(filepath1, filepath2, program.opts().format)));

program.parse(process.argv);
