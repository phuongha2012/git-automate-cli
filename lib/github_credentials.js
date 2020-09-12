const Octokit = require('@octokit/rest');
const Configstore = require('configstore');
const _ = require('lodash');

const pkg = require('../package.json');
const conf = new Configstore(pkg.name);

const inquirer = require('./inquirer');

module.exports = {
    getInstance: () => {
        return global.octokit;
    },

    // gitHubAuth: (token) => {
    //     octokit.authenticate({
    //         type: 'oauth',
    //         token: token
    //     })
    // },

    getStoredGitHubToken: () => {
        return conf.get('github_credentials.token');
    },

    setGitHubCredentials: async () => {
        const credentials = await inquirer.askGitHubCredentials();
        console.log(credentials);
        const result =  _.extend(
                {
                    type: "basic"
                },
                credentials
            );

        global.octokit = Octokit({
            auth: result
        });
    },

    registerNewToken: async () => {
        try {
            const response = await global.octokit.oauthAuthorizations.createAuthorization({
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'git-automate-cli: a tool for dev workflow automation'
            });

            const token = response.data.token;
            if (token) {
                conf.set('github_credentials.token', token);
                return token;
            } else {
                throw new Error('Missing token', 'Github token is not retrieved.');
            }
        } catch (err) {
            throw err;
        }
    }
}

