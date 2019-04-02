const Commando = require('discord.js-commando');
const auth = require('./auth.json');

const bot = new Commando.Client({
    commandPrefix: 'p.',
    owner: auth.authorID,
    disableEveryone: true
});

const TOKEN = auth.token;

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('team', 'Team');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.currentTeamMembers = [];
global.servers = {};

bot.on('ready', () => {
    console.log('Bot has booted and is ready for use.');
    bot.user.setStatus('online')
    bot.user.setPresence({
        game: {
            name: 'p.help | Made By @Tay#0211',
            type: "PLAYING",
        }
    });
});

bot.on("guildMemberAdd", function(member)
{
    let guest = member.guild.roles.find("name", "Guest"); 
    let faction1 = member.guild.roles.find("name", "Likao Faction");
    let faction2 = member.guild.roles.find("name", "Nurmei Faction");
    let faction3 = member.guild.roles.find("name", "Yureno Faction");
    member.addRole(guest);
    let chance = Math.floor(Math.random() * 3);
    if(chance == 0)
    {
        member.addRole(faction1);
        member.send("Welcome to " + member.guild + ". You were given a faction randomly, the faction you have been placed in is the Likao Faction. Good luck, read the rules and have fun!");
        const channel = bot.channels.find('name', 'new-likao-members');
        channel.send("Please welcome " + member + " to the Likao Faction!");
    }
    else if(chance == 1)
    {
        member.addRole(faction2);
        member.send("Welcome to " + member.guild + ". You were given a faction randomly, the faction you have been placed in is the Nurmei Faction. Good luck, read the rules and have fun!");
        const channel = bot.channels.find('name', 'new-nurmei-members');
        channel.send("Please welcome " + member + " to the Nurmei Faction!");
    }
    else
    {
        member.addRole(faction3);
        member.send("Welcome to " + member.guild + ". You were given a faction randomly, the faction you have been placed in is the Yureno Faction. Good luck, read the rules and have fun!");
        const channel = bot.channels.find('name', 'new-yureno-members');
        channel.send("Please welcome " + member + " to the Yureno Faction!");
    }
});

bot.login(process.env.BOT_TOKEN);
