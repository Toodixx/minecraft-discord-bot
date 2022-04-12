const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');

const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const config = require('./config.json');

const prefix = (config.prefix);

const fs = require('fs');

const schedule = require("node-schedule");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () =>{
    console.log('Bot Active!');
    client.user.setActivity('The Discord Server', {type: 'WATCHING' });
});

schedule.scheduleJob('*/1 * * * *', function(){
    client.commands.get('status').run(client, Discord);
});

client.on('messageCreate', message=>{
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').run(message, args, client, Discord);
    }else if (command == 'about'){
        message.channel.send('This bot was created by Toodixx');
    }else if(command === 'ticket'){
        client.commands.get('ticket').run(message, args, client, Discord);
    }else if(command === 'suggest'){
        client.commands.get('suggestions').run(message, args, client, Discord);
    }else if(command === 'suggestion'){
        client.commands.get('suggestions').run(message, args, client, Discord);
    }else if(command === 'close'){
        client.commands.get('close').run(message, args, client, Discord);
    }
});

client.login(config.token);