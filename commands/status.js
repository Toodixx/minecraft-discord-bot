const mcutil = require('minecraft-server-util')
const config = require('../config.json');

module.exports = {
    name: 'status',
    description: "Server Pinger",
    async run (client, Discord){

        mcutil.status(config.IP, config.port).then((response) =>{
            client.channels.cache.get(config.PlayerCountChannel).setName('Online: ' + response.players.online);
        })
    }
}