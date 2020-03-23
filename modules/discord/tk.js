module.exports = {
    name: 'tk',
    description: 'Log a team kill',
    usage: '$tk <killer> <killed> <description (optional)>',
    execute(msg, connector, db, args) {
        let responses =[
            'Lol what an ape',
            'dayum sahn',
            'huh HUH?',
            'Alright',
            'Remember, Apes together Strong'
        ]
        if (msg.mentions.users.size && msg.mentions.users.size !== 2) return;
        let killer, killed;
        [killer, killed] = [...msg.mentions.users.values()];
        args.splice(0,2);
        let note = args.size !== 0 ? args.join(" ") : null;
        connector.mongoConnector.logTeamKill(db, {killer: killer.username, killed: killed.username, note}, (err, result)=>{
            console.log('callback')
            if(err) {
                console.log(`something went wrong with tk command: ${err}`)
            }
            console.log(responses[Math.floor(Math.random() * responses.length)])
            msg.reply(responses[Math.floor(Math.random() * responses.length)])
        })

    },
};