const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require('fs');
let test = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('realmeye | /help', { type: 'WATCHING' }).then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
.catch(console.error);
});

const prefix = '/'
client.on('message', async msg => { // START MESSAGE HANDLER
  if (msg.author.bot) return;
  let args = msg.content.split(" ");

  if (msg.content.toLowerCase().startsWith(prefix + 'player')) {

    let ruser = args[1]
    console.log(ruser)
    let rapii = "http://www.tiffit.net/RealmInfo/api/user?u=" + ruser + "&f=;";
    let petrapii = "http://www.tiffit.net/RealmInfo/api/pets-of?u=" + ruser;


    if (!ruser)
      return msg.channel.send({
        embed: {
          color: 0xFF0000,
          description: "<:warn:459473619613908994> You did not provide a RotMG Username to look up!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
    snekfetch.get(petrapii).then(p => {
      if (!p.body.error) {
        var abia = p.body.pets[0].ability1.type
        var leva = p.body.pets[0].ability1.level
        if (!p.body.pets[0].ability1.unlocked == true) {
          var abia = ""
          var leva = ""
        } else {
          var leva = leva.toString();
        }


        var abib = p.body.pets[0].ability2.type
        var levb = p.body.pets[0].ability2.level
        if (!p.body.pets[0].ability2.unlocked == true) {
          var abib = ""
          var levb = ""
        } else {
          var levb = levb.toString();
        }

        var abic = p.body.pets[0].ability3.type
        var levc = p.body.pets[0].ability3.level
        if (!p.body.pets[0].ability3.unlocked == true) {
          var abic = ""
          var levc = ""
        } else {
          var levc = levc.toString();
        }

        if (!test['h']) {
          test['h'] = `${leva} ${abia} • ${levb} ${abib} • ${levc} ${abic}`
        } else {
          test['h'] = `${leva} ${abia} • ${levb} ${abib} • ${levc} ${abic}`
        }
        console.log(test['h'])
        fs.writeFile('./test.json', JSON.stringify(test), console.error);
      } else {
        test['h'] = `hidden`
      }
    }) // end petinfo
    snekfetch.get(rapii).then(r => {
      if (!r.body.error) {
        var desc1 = r.body.description[0]
        var desc2 = r.body.description[1]
        var desc3 = r.body.description[2]
        var name = r.body.name
        var stars = r.body.rank
        var location = r.body.last_seen
        var fame = r.body.fame
        var count = r.body.characterCount
        var acctfame = r.body.account_fame
        var created = r.body.created
        var skins = r.body.skins
        var guildd = r.body.guild
        var chars = r.body.characters
        var guildrank = r.body.guild_rank
        if (count == -1) {
          var count = 'hidden'
        }
        if (skins == -1) {
          var skins = 'hidden'
        }
        if (!chars[0]) {
          var finalchars = 'hidden'
        } else {
          var finalchars = ""
          if (chars.length > 10) {
            for (i in chars) {
          finalchars += `**${chars[i].stats_maxed}**`
            finalchars += " "
            finalchars += chars[i].class
            if (chars[i].equipment[4]) {
              finalchars += " <:backpack:462699732884783134>"
            }
            finalchars += ` | Fame: **${chars[i].fame}** `
            finalchars += "\n"
            }
          }else {
          for (i in chars) {
            finalchars += `**${chars[i].stats_maxed}**`
            finalchars += " "
            finalchars += chars[i].class
            if (chars[i].equipment[4]) {
              finalchars += " <:backpack:462699732884783134>"
            }
            finalchars += ` | Base <:fame:456347834908672030>: **${chars[i].fame}** `
            finalchars += "\n"
          }
          }
        }

      } else {
        msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> Either user doesn't exist, or has a hidden Realmeye Profile!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        return;
      }

      msg.channel.send({
        embed: {
          color: 0xFFFFFF,
          author: {
            name: "Realmeye Information for",
            icon_url: client.user.avatarURL
          },
          title: `**${name}**`,
          url: `http://www.realmeye.com/player/${name}`,
          description: `**Description:**\n${desc1}\n${desc2}\n${desc3}`,
          fields: [{
              name: "Stars",
              value: `**${stars}** ★`,
              inline: true
            },
            {
              name: "First Seen",
              value: `*${created}*`,
              inline: true
            },
            {
              name: "Last Seen",
              value: `*${location}*`,
              inline: true
            },
            {
              name: "Fame",
              value: `Alive <:fame:456347834908672030>: **${fame}** | Account <:fame:456347834908672030>: **${acctfame}**`,
              inline: true
            },
            {
              name: "Guild",
              value: `**${guildd}** | Rank: **${guildrank}**`,
              inline: true
            },
            {
              name: "Pet",
              value: `${test['h']}`,
              inline: true
            },
            {
              name: "Characters",
              value: `${finalchars}`
            },
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid"
          },
          thumbnail: {
            "url": "https://www.realmeye.com/s/c9/img/eye-big.png"
          }
        }
      });

    }) //endrealmeyechar
  } //end player


  if (msg.content.toLowerCase().startsWith(prefix + 'guild')) {
    var argss = msg.content.split(" ").splice(1)
    let guild = argss.slice(0).join(' ');
    if (!guild) {
      msg.channel.send({
        embed: {
          color: 0xFF0000,
          description: "<:warn:459473619613908994> You did not provide a Guild Name to look up!",
          timestamp: new Date(),
          footer: {
            text: "© Droid & Co."
          }
        }
      })
      return;
    }
    console.log(guild)
    let guildapi = "http://www.tiffit.net/RealmInfo/api/guild?g=" + guild + "&f="
    snekfetch.get(guildapi).then(g => {
      if (!g.body.error) {
        var guildname = g.body.name
        var membercount = g.body.memberCount
        var membercount = membercount.toString()
        var characters = g.body.characters
        var characters = characters.toString()
        var guildfame = g.body.fame.amount
        var guildfame = guildfame.toString()
        var worldrank = g.body.fame.rank
        var activeserver = g.body.most_active.server
        var serverrank = g.body.most_active.rank

        var founders = ""
        var leaders = ""
        var officers = ""
        var members = ""
        var initiates = ""

        for (i in g.body.members) {
          if (g.body.members[i].guild_rank == "Founder") {
            founders += `${g.body.members[i].name}`
            founders += "\n"
          }
          if (g.body.members[i].guild_rank == "Leader") {
            leaders += `${g.body.members[i].name}`
            leaders += "\n"
          }
          if (g.body.members[i].guild_rank == "Officer") {
            officers += `${g.body.members[i].name}`
            officers += "\n"
          }
          if (g.body.members[i].guild_rank == "Member") {
            members += `${g.body.members[i].name}`
            members += "\n"
          }
          if (g.body.members[i].guild_rank == "Initiate") {
            initiates += `${g.body.members[i].name}`
            initiates += "\n"
          }
          if (initiates == "") initiates += "None"
          if (members == "") members += "None"
          if (officers == "") officers += "None"
          if (leaders == "") leaders += "None"
          if (founders == "") founders += "None"
        }



        msg.channel.send({
          embed: {
            color: 0xFFFFFF,
            author: {
              name: "Guild Information for"
            },
            title: `**${guildname}**`,
            url: `http://www.realmeye.com/player/${guildname}`,
            fields: [{
                name: "Members",
                value: `**${membercount}**`,
                inline: true
              },
              {
                name: "Guild <:fame:456347834908672030>",
                value: `*${guildfame}*`,
                inline: true
              },
              {
                name: "Active Server",
                value: `*${activeserver}*`,
                inline: true
              },
              {
                name: "Ranks 📈",
                value: `Server: **${serverrank}** | World: **${worldrank}**`,
                inline: true
              },
              {
                name: "Count Stats",
                value: `# of Members **${membercount}** | # of Characters: **${characters}**`,
                inline: true
              },
              {
                name: "Founder(s)",
                value: `${founders}`
              },
              {
                name: "Leaders",
                value: `${leaders}`
              },
              {
                name: "Officers",
                value: `${officers}`
              },
              {
                name: "Members",
                value: `${members}`
              },
              {
                name: "Initiates",
                value: `${initiates}`
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid"
            },
            thumbnail: {
              "url": "https://www.realmeye.com/s/c9/img/eye-big.png"
            }
          }
        });

      } else {
        msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> Guild not found!\nNote: *Guild Names are CASE-SENSITIVE*",
            timestamp: new Date(),
            footer: {
              text: "© Droid & Co."
            }
          }
        })
      }
    })
  }// end guild
  
  if (msg.content.toLowerCase().startsWith(prefix + 'invite')) {
  msg.channel.send({
  embed: {
  color: 0x000000,
  description: "Click [here](https://discordapp.com/api/oauth2/authorize?client_id=462681278639243274&permissions=346112&scope=bot) to invite me to your server! Please leave the default permissions on!",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
  }
  
  
  if (msg.content.toLowerCase().startsWith(prefix + 'help')) {
  
  var param = args[1]
  if (!param) return msg.channel.send({
        embed: {
          color: 0x000000,
 					fields: [{
          name: "Commands",
          value: "To get help for a specific command, use `/help <command>`"
          },
          {
          name: "<a:oryx:462438025956425748> RotMG",
          value: "```ini\n[player] [guild]```"
          },
          {
          name: "<:info:459473619530285057> Information",
          value: "```ini\n[help] [invite]```"
          }
          
          
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'player') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Player Command**\nFunction: Gets a player's data through Realmeye\nUsage: `/player <Rotmg Username>`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'guild') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Guild Command**\nFunction: Gets a guild's data through Realmeye\nUsage: `/guild <Guild Name>`\nNote: *Guild name is case-sensitive*",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
    if (param == 'invite') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Invite Command**\nFunction: Sends an invite link for the bot\nUsage: `/invite`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
  
  }
  
}) // end message handler

client.login(process.env.BOT_TOKEN)
