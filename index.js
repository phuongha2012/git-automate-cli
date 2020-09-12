const program = require('commander');
const chalk = require('chalk');  // applies colors and styles
const figlet = require('figlet'); // creates large letters with text
const clear = require('clear'); // removes current output in the console

const files = require('./lib/files');

program
    .command('init')
    .description('Draw app banner')
    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('git-automate-cli', { horizontalLayout: false })));
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}

