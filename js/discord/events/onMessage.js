const {
    Discord
} = require("../../Imports.js");

module.exports = function(msg) {
    const client = global.gClientDiscord;
    if(msg.author.bot) return;
    else if(msg.content.startsWith(global.gConfig.prefix)) return normalCommands(client, msg);
    else if(msg.content.startsWith(global.gConfig.prefixA)) return adminCommands(client, msg);
    else if(msg.isMemberMentioned(client.user)) return botMention(msg);
};

function normalCommands(client, msg) {
    const args = msg.content.slice(global.gConfig.prefix.length).split(/ +/);
    const command = args.shift().toUpperCase();

    if(!client.commands.has(command)) return;
    try {
        `[Discord]${msg.guild === null ? "[DM]" : "[N]"}: ${msg.author.tag} executed ${command} ${args}`.sendLog();
        return client.commands.get(command).execute(msg, args);
    } catch (error) { `[Error]: ${error}`.sendLog();  }
    return;
}

function adminCommands(client, msg) {
    const args = msg.content.slice(global.gConfig.prefixA.length).split(/ +/);
    const command = args.shift().toUpperCase();

    let isAdmin = false;
    if(msg.member.hasPermission("ADMINISTRATOR")) isAdmin = true;
    if(!isAdmin) for(i of admin_roles) if(msg.member.roles.has(i)) isAdmin = true;
    
    if(!isAdmin) return "You dont have ADMIN/MOD permissions".sendTemporary(msg);
    if(!client.admin.has(command)) return;
    try {
        `[Discord][A]: ${msg.author.tag} executed ${command} ${args}`.sendLog();
        return client.admin.get(command).execute(msg, args);
    } catch (error) { console.log(error) }
    return;
}

function botMention(msg, dm) {
    `[Discord]${msg.guild === null ? "[DM]" : ""}: ${msg.author.tag} mentioned the bot`.sendLog();
    const helpChannel = `**${global.gConfig.prefix}help:** Normal commands`
                      + `\n**${global.gConfig.prefixA}help:** Admin commands`

    const helpDM = `**${global.gConfig.prefix}help:** DM commands`

    const eMention = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("**HELP COMMANDS**")
        .setDescription(dm ? helpDM : helpChannel);

    if(dm) return msg.author.send(eMention);
    else return msg.channel.send(eMention);
}