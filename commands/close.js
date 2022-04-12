module.exports = {
    name: 'close',
    description: "this is a staff command to close a support ticket",
    async run (message, args, cmd, client, Discord){
        const config = require('../config.json');
        const categoryID = [config.ticketCategory]
        if (message.member.roles.cache.has(config.supportRole)) {
            if(message.channel.parentId == categoryID) {
                message.channel.send('This channel will be deleted in 5 minutes');
                    setTimeout(() => message.channel.delete(), 300000);

              }
              
              else {
                message.channel.send('you are in the wrong channel');   
        }
          }
          
          else {
            message.channel.send('This command can only be ran by the support team');   
    }
}
}