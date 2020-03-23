const Discord = require('discord.js');

module.exports = {
    name: 'tkleader',
    description: 'View leader board for Teamkills',
    usage: '$tkleader',
    execute(msg, connector, db, args) {
        connector.mongoConnector.leaderBoard(db, {}, (err, result)=>{
            if(err)
                console.log(`something went wrong with tkleader command: ${err}`);

            let fields = [];
            console.log(result[0].incidents.length)
            result.forEach(user => fields.push({name: user.user, value: user.incidents.length}));

            fields.sort((a,b) => a.value - b.value);

            const embeddedResponse = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Tarkov Team Kill Leaderboard')
                .addFields(...fields.reverse())
                .setTimestamp()
                .setFooter('Remember, apes together strong', 'https://media.npr.org/assets/img/2015/10/08/istock_000013696787_small-40f929a109f759d798fc1d8afc718cc78a2ac18b-s600-c85.jpg');
            msg.reply(embeddedResponse);
        })

    },
};
