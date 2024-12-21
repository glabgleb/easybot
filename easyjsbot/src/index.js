require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const regis = require('./regis');
const handler = require('./handler');


const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

bot.once('ready', (b) => {
    regis(bot);
    handler(bot);


    console.log(`${b.user.tag} is online!`);

    b.user.setPresence({
        status: 'idle',
        activities: [
            {
                name: 'YOU',
                type: ActivityType.Watching
            }
        ]
    });

});

bot.on('interactionCreate', async (i) => {
    if (!i.isCommand()) return;
    if (i.member.bot) return;

    const command = bot.commands.get(i.commandName);

    if (!command) return;

    try {
        await command.execute(i);
    } catch (error) {
        return await i.reply(`An error has occurred: ${error}`);
    }

});

bot.login(process.env.TOKEN);

