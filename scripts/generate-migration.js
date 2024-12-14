/* eslint-disable @typescript-eslint/no-var-requires */

const { spawn } = require('child_process');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Please provide a migration name.');
  console.error('Usage: yarn generate:migration MigrationName');
  process.exit(1);
}

const migrationPath = `./src/migrations/${migrationName}`;

const tsNodePath = path.resolve('./node_modules/.bin/ts-node');
const cliPath = path.resolve('./node_modules/typeorm/cli.js');

const args = [
  '-r',
  'tsconfig-paths/register',
  cliPath,
  'migration:generate',
  migrationPath,
  '-d',
  './src/config/typeorm.config.ts',
];

const options = {
  stdio: 'inherit',
  shell: process.platform === 'win32',
};

const child = spawn(tsNodePath, args, options);

child.on('close', (code) => {
  process.exit(code);
});
