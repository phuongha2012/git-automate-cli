const program = require('commander');
const chalk = require('chalk');  // applies colors and styles
const figlet = require('figlet'); // creates large letters with text
const clear = require('clear'); // removes current output in the console

const files = require('./lib/files');
const github = require('./lib/github_credentials');

program
    .command('init')
    .description('Draw app banner')
    .action(() => {
        clear();
        console.log(chalk.magenta(figlet.textSync('git-automate-cli', { horizontalLayout: false })));
    });

program
    .command('octocheck')
    .description('Check user\'s github credentials')
    .action(async () => {
        let token = github.getStoredGitHubToken();
        if (!token) {
            await github.setGitHubCredentials();
            token = await github.registerNewToken();
        }
        console.log(token);
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}

