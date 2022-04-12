module.exports = {
    name: 'ping',
    description: "this is a ping commmand!",
    async run (message, args, cmd, client, Discord){
        const { MessageEmbed, Message } = require('discord.js');
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Pong!')
	    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})

    message.channel.send({ embeds: [embed] });     
    }
}