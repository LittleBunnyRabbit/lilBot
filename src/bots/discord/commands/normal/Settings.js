const {
    Discord,
    Command 
} = require("../../../../imports/Imports");

const jInfo = require("../../../../db/info.json");

module.exports = new Command.Normal()
      .setName("SETTINGS")
      .setInfo("Pro rocket league settings")
      .addUse("settings", "get the potato settings")
      .setCommand(sendSettings);

function sendSettings(msg) {
    let settingsList = "";
    for(i in jInfo.settings) settingsList += `**${i.toUpperCase()}:** ${jInfo.settings[i]}\n`

    const eSettings = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("**SETTINGS**")
          .setDescription(settingsList);

    return msg.channel.send(eSettings);
}