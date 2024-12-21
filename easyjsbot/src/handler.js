const fs = require('fs');
const path = require('path');

module.exports = (c) => {
    c.commands = new Map();

    const commandFolders = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => {
        return fs.statSync(path.join(__dirname, 'commands', file)).isDirectory();
    });

    for (const folder of commandFolders) {
        const cfolder = fs.readdirSync(path.join(__dirname, 'commands', folder));
        for (const file of cfolder) {
            const command = require(path.join(__dirname, 'commands', folder, file));
            c.commands.set(command.data.name, command);
        }
    }
};