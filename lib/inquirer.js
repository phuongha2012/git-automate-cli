const inquirer = require('inquirer');
const minimist = require('minimist');
const files = require('./files');

module.exports = {
    askGitHubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your github username or email address: ',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your github username or email address:';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your github password: ',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Enter your github password:';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
}