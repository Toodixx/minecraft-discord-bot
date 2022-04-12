const config = require('../config.json');
module.exports = {
    name: 'suggestions',
    aliases: [],
    permissions: [],
    description: "Allows users to make server suggestions",
    async run (message, args, cmd, client, discord){
        const { MessageEmbed } = require('discord.js');
        const channel = message.guild.channels.cache.get(config.suggestionchannel);
        if(!channel) return message.channel.send('There is no suggestions channel set for me to post in :frowning2:');

        let messageArgs = args.join(' ');
        const embed = new MessageEmbed()
        .setColor('e6b1ef')
	    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
	    .setDescription(messageArgs)

    channel.send({ embeds: [embed] }).then((msg) =>{
        msg.react('💜');
        msg.react('💩');
        message.delete();
    }).catch((err)=>{
        throw err;
    });
    }
}