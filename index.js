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


if (msg.content.toLowerCase().startsWith(prefix + 'chars')) {
var charuser = args[1]

if (!charuser)
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
      let charapi = "http://www.tiffit.net/RealmInfo/api/user?u=" + charuser + "&f=;";
      
      snekfetch.get(charapi).then(r => {
      
      var chars = r.body.characters
if (!chars[0]) {
          var finalchars = 'hidden'
        } else {
          var finalchars = ""
     
          for (i in chars) {
            finalchars += `**${chars[i].stats_maxed}**`
            finalchars += " "
            finalchars += chars[i].class
            if (chars[i].equipment[4]) {
              finalchars += " <:backpack:462699732884783134> \n"
            }
            finalchars += `Base <:fame:456347834908672030>: **${chars[i].fame}**`
            finalchars += "\n"
            /*finalchars += `Equips: \n ${chars[i].equipment[0]} **|** ${chars[i].equipment[1]} **|** ${chars[i].equipment[2]} **|** ${chars[i].equipment[3]}
            \n`*/
          }
          
        }
        msg.channel.send({
        embed: {
          color: 0xFFFFFF,
          author: {
            name: "RotMG Characters for",
            icon_url: client.user.avatarURL
          },
          title: `**${r.body.name}**`,
          url: `http://www.realmeye.com/player/${r.body.name}`,
          description: `${finalchars}`,
          
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

        
        
        
})
}

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
        var guildrank = r.body.guild_rank
        if (count == -1) {
          var count = 'hidden'
        }
        if (skins == -1) {
          var skins = 'hidden'
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
            }
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
if (msg.content.toLowerCase().startsWith(prefix + 'backpack')) {
let backpackapi = 'http://www.tiffit.net/RealmInfo/api/nexusitems?c=misc'

snekfetch.get(backpackapi).then(b=> {
for (i in b.body.item) {
if (b.body.item[i].name == "Backpack") {
var cheapest = b.body.item[i].cheapest_on
var price = b.body.item[i].price
var quantity = b.body.item[i].quantity
var timeleft = b.body.item[i]['Time Left']
msg.channel.send({
        embed: {
          color: 0xC76520,
          author: {
            name: "**Cheapest Backpack**"
          },
          fields: [{
              name: "Location",
              value: `${cheapest}`,
              inline: true
            },
            {
              name: "Price",
              value: `${price} <:coin:463847187957415946>`,
              inline: true
            },
            {
              name: "Supply",
              value: `${quantity} left`,
              inline: true
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid"
          },
          thumbnail: {
            "url": "https://static.drips.pw/rotmg/wiki/Consumable/Other/Backpack.png"
          }
        }
      });
}
}

 



})

}
if (msg.content.toLowerCase().startsWith(prefix + 'gmembers')) {
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
    let gapi = "http://www.tiffit.net/RealmInfo/api/guild?g=" + guild + "&fe"
    snekfetch.get(gapi).then(g => {
    
    if (!g.body.error) {
var founders = ""
        var leaders = ""
        var officers = ""
        var members = ""
        var initiates = ""

        for (i in g.body.members) {
          if (!g.body.members[i].guild_rank) continue;
          if (g.body.members[i].guild_rank == "Founder") {
            founders += `${g.body.members[i].name}`
            founders += ", "
          }
          if (g.body.members[i].guild_rank == "Leader") {
            leaders += `${g.body.members[i].name}`
            leaders += ", "
          }
          if (g.body.members[i].guild_rank == "Officer") {
            officers += `${g.body.members[i].name}`
            officers += ", "
          }
          if (g.body.members[i].guild_rank == "Member") {
            members += `${g.body.members[i].name}`
            members += ", "
          }
          if (g.body.members[i].guild_rank == "Initiate") {
            initiates += `${g.body.members[i].name}`
            initiates += ", "
          }
          
        }
        
        msg.channel.send({
        embed: {
          color: 0xFFFFFF,
          author: {
            name: "Guild Members of",
            icon_url: client.user.avatarURL
          },
          title: `**${g.body.name}**`,
          description: `**Founder(s):** ${founders}\n**Leaders:** ${leaders}\n**Officers:** ${officers}\n**Members:** ${members}\n**Initiates:** ${initiates}`,
          
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
        
        
        
        }else {
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
}
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
    let guildapi = "http://www.tiffit.net/RealmInfo/api/guild?g=" + guild + "&fe"
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

        



        msg.channel.send({
          embed: {
            color: 0xFFFFFF,
            author: {
              name: "Guild Information for"
            },
            title: `**${guildname}**`,
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
              }
              
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
  
  if (msg.content.toLowerCase().startsWith(prefix + 'info')) {
  msg.channel.send({
        embed: {
          color: 0x000000,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          description: "Realmeye Bot is discord bot for RotMG Players to use for convenience. It makes fetching user and guild info easier and presentable, and overall improves players' experience with the game!\nTo see what commands this bot has to offer, type `/help` in a channel!\nTo invite this bot to your server, type `/invite`",
 					fields: [{
          name: "Framework",
          value: "Discord.js ⇨ [Documentation](https://discord.js.org/#/)"
          },
          {
          name: "Language",
          value: "JavaScript ⇨ [jsOfficial](https://www.javascript.com/)"
          },
          {
          name: "Developer",
          value: "`~Droid~#5799` ⇨ [Realmeye Profile](https://www.realmeye.com/player/droidmxbro) | [Github](https://github.com/droidmx)"
          }
          
          
          ],
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
          value: "```ini\n[player] [chars] [guild] [gmembers] [backpack]```"
          },
          {
          name: "<:info:459473619530285057> Information",
          value: "```ini\n[help] [invite] [info]```"
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
if (param == 'backpack') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Backpack Command**\nFunction: Shows the cheapest place to buy a Backpack and more\nUsage: `/backpack`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'chars') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Character Command**\nFunction: Shows a player's characters\nUsage: `/chars <Rotmg Username>`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'gmembers') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Guild Members Command**\nFunction: Gets a list of members of the specified guild\nUsage: `/gmembers <Guild Name>`\nNote: *Guild name is case-sensitive*",
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
