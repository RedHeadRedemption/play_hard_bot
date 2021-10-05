const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!')
        .addSubcommand(subcommand =>
          subcommand
            .setName('user')
            .setDescription('Info about a user')
            .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
          subcommand
            .setName('server')
            .setDescription('Info about the server')),
    async execute(interaction) {
      
      if(interaction.options.getSubcommand() === 'user') {
        await interaction.reply(`User info:\nUser_Tag: ${interaction.user.tag} \nUser_ID: ${interaction.user.id}`);
      }
      else if(interaction.options.getSubcommand() === 'server') {
        await interaction.reply(`Server info:\nName: ${interaction.guild.name} \nTotal Members: ${interaction.guild.memberCount}`);
      }
		  
    }
}