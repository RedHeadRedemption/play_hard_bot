const {SlashCommandBuilder} = require('@discordjs/builders');


module.exports = {
    data : new SlashCommandBuilder()
        .setName('playhard')
        .setDescription('Start a new playing session!')
        .addStringOption(option => 
            option.setName('mode')
            .setDescription('Session difficulty')
            .setRequired(true)
            .addChoice('Easy','easy_mode')
            .addChoice('Normal','normal_mode')
            .addChoice('Hard','hard_mode')
        ),
    async execute(interaction) {
        const mode = interaction.options.getString('mode');
        let cooldown = 3000;

        if (mode == 'easy_mode') {
            cooldown = 3000;
        }
        else if (mode == 'normal_mode') {
            cooldown = 6000;
        }
        else {
            cooldown = 9000;
        }
        

        await interaction.reply("Started Playing");
        await setTimeout(() => { interaction.deleteReply(); }, cooldown );

    }
    
}