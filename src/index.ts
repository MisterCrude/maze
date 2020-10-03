import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';

import { someConst } from './module';

clear();

console.log(
  chalk.yellow(figlet.textSync('labyrinth', { horizontalLayout: 'full' }))
);

console.log(chalk.green(someConst));
