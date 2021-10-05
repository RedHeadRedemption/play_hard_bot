const {SlashCommandBuilder} = require('@discordjs/builders');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('playhard')
        .setDescription('Start a new playing session!'),
    async execute(interaction) {

        await interaction.reply("Started Playing");
    }
    
}