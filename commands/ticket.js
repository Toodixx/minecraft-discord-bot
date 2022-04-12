module.exports = {
    name: 'ticket',
    aliases: [],
    permissions: [],
    description: 'Opens a support ticket',
    async run (message, args, cmd, client, Discord){
        const config = require('../config.json');
        let support = message.guild.roles.cache.get(config.supportRole)
        const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
        channel.setParent(config.ticketCategory);

        channel.permissionOverwrites.create(message.guild.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        });
        channel.permissionOverwrites.create(message.author, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });
        channel.permissionOverwrites.create(support, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });
        
        const reactionMessage = await channel.send('Thankyou for opening a support ticket! Please leave a message with your issue and will we respond as soon as possible.');
        message.channel.send(`We will be with you in a moment! ${channel}`).then((msg) => {
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 3000);
        }).catch((err) => {
            throw err;
        });
    },
};