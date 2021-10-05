const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();



// Create a new client instance
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

// Add the event interractions
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Add a collection of existing commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}



// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);