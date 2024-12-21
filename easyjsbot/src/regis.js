require('dotenv').config();
const { REST, Routes } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = (c) => {
    const rest = new REST({ version: '10' }).setToken(process.env.DTOKEN);

    const commands = []
    const commandFolders = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => {
        return fs.statSync(path.join(__dirname, 'commands', file)).isDirectory();
    });

    for (const folder of commandFolders) {
        const cfolder = fs.readdirSync(path.join(__dirname, 'commands', folder));
        for (const file of cfolder) {
            const command = require(path.join(__dirname, 'commands', folder, file));
            commands.push(command.data.toJSON());
        }
    }

    (async () => {
        try {
            const guilds = c.guilds.cache.map(guild => guild.id);
            for (const guildId of guilds) {
                await rest.put(
                    Routes.applicationGuildCommands(process.env.BOT_ID, guildId),
                    { body: commands }
                );
            }

            console.log("Successfully registered slash command.");
        } catch (error) {
            console.log(`An error has occurred: ${error}`);
        }
    })();

};
