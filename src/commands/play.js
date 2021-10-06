const {SlashCommandBuilder} = require('@discordjs/builders');

const sessionTimers = new Map();

const delay = t => new Promise(resolve => setTimeout(resolve, t));


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
        
        sessionTimers.set(interaction.user.tag, Date.now() + cooldown);
        console.log("New session started", sessionTimers);

        await interaction.reply("Started Playing");

        //Timeout for deleting reply
        await setTimeout(() => { interaction.deleteReply(); }, 3000 ); //change to 30000 on production

        //Timeout for playing session
        await setTimeout(() => { 
            sessionTimers.delete(interaction.user.tag);
            
            const currentChannel = interaction.channelId;
            interaction.client.channels.fetch(currentChannel)
            .then(channel => { 
                channel.send(" Hi there")
                .then(message => { 
                    delay(15000).then(() => message.delete()); //Change to 30000 on production
                }) 
            })
            // .then(message => { setTimeout(message.delete(), 3000); });

            console.log("cooldowns after deletion: ", sessionTimers);
        }, cooldown );


    }
    
}