const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('example'),
    async execute(i) {
        // Example Code
    }
};