const fs = require('fs');
const path = require('path');

module.exports = {
    // path.basename method extracts the filename from a file path
    // process.cwd returns the current working directory
    getCurrentDirectoryBase : () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        try {
            // fs.statSync return a stat object about the given filepath
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    isGitRepositoryExist: () => {
        if (files.directoryExists('.git')) {
            console.log(chalk.red('Sorry, Can\'t create a new git repo as there already exists one'));
            process.exit();
        }
    }
}
