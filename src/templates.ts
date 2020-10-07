import chalk from 'chalk';
import figlet from 'figlet';

export const mainTmp = (appName: string): string =>
  chalk.yellow(figlet.textSync(appName, { horizontalLayout: 'full' }));
