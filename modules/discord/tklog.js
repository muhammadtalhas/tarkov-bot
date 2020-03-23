const Discord = require('discord.js');

module.exports = {
    name: 'tklog',
    description: 'View a players log',
    usage: '$tklog <player>',
    execute(msg, connector, db, args) {
        if (msg.mentions.users.size && msg.mentions.users.size !== 1) return;

        connector.mongoConnector.userLog(db, {user: msg.mentions.users.first().username}, (err, result)=>{
            if(err)
                console.log(`something went wrong with tklog command: ${err}`);

            let fields = [];
            result.incidents.forEach(incident => fields.push({name: incident.user, value: `${incident.note ? incident.note: '-'} @ ${new Date(incident.time).getMonth()}/${new Date(incident.time).getDate()}/${new Date(incident.time).getFullYear()} ${new Date(incident.time).getHours()}:${new Date(incident.time).getMinutes()}`, inline:true}));


            const embeddedResponse = new Discord.MessageEmbed()
                .setColor('#ff010d')
                .setTitle(`Incident report for ${msg.mentions.users.first().username}`)
                .setDescription(`Total Number of incidents: ${result.incidents.length}`)
                .addFields(...fields)
                .setTimestamp()
                .setFooter('Remember, apes together strong', 'https://media.npr.org/assets/img/2015/10/08/istock_000013696787_small-40f929a109f759d798fc1d8afc718cc78a2ac18b-s600-c85.jpg');
            msg.reply(embeddedResponse);
        })

    },
};



/*
[
  {
    _id: 5e76efb310aa78a3bd45319c,
    user: 'muhammadtalhas',
    incidents: [ [Object] ]
  }
]

 */