require('dotenv').config();


const dbConnector = require('./modules/database/dbConnector.js');
const dbConfig = require('./modules/database/dbConfig.js');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const botCommands = require('./modules/discord');

Object.keys(botCommands).map(key => {
    client.commands.set(`$${botCommands[key].name}`, botCommands[key]);
});

let db;
dbConfig.mongoClient.connect(dbConfig.mongoUrl, {auth:{user: process.env.DB_USER, password: process.env.DB_PASSWORD}}, function (err, database) {
    if(err) {
        console.log(`MONGO IS A NO GO${err}`);
        return;
    }
    db= database.db('tarkov-bot')
});

const TOKEN = process.env.DISCORD_TOKEN;
client.login(TOKEN);
client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    //TODO special case for $help cause im lazy
    if(command === '$help'){
        let response = ['`'];
        response.push('COMMAND ****** DESCRIPTION ****** USAGE');
        const keys = Object.keys(botCommands);
        for(let command of keys){
            response.push(`$${command} ****** ${botCommands[command].description} ****** ${botCommands[command].usage}`)
        }
        response.push('`');
        console.log(response.join("\n"));
        msg.reply(response);
    }
    if (!client.commands.has(command)) return;
    console.info(`Called command: ${command}`);
    try {
        client.commands.get(command).execute(msg, dbConnector, db, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});
