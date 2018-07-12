const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require('fs');
let test = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('the Nexus | /help', { type: 'WATCHING' }).then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
.catch(console.error);
});
client.on('guildMemberAdd', member => {

if (member.guild.id == '466690926702755841') {
    var memberrole = member.guild.roles.find('name', 'Initiates');
    member.addRole(memberrole)
client.channels.get('466746073822527488').send(`Welcome ${member} to Guill's Support Server <:guill:466746583271211009>!`)
}
})
const prefix = '/'
client.on('message', async msg => { // START MESSAGE HANDLER
  if (msg.author.bot) return;
  let args = msg.content.split(" ");


if (msg.content.toLowerCase().startsWith(prefix + 'launch')) {
if (msg.author.id != '368756694114893825') return; 
var allusers = client.users.array();
allusers.forEach((member) => {
console.log(member.id)

member.send(`__**A Message from the creator of ${client.user}**__

\n\n*I swear this is the only times you will get messaged!*

\n\nJust under a week ago, this bot was released. In that short amount time, this bot has jumped to **70 active servers** and **3.1k users**! What a big achievement!! As some of you may know, I have been continuously adding new commands to the bot. You can keep checking for new commands by typing \`/help\` once in a while. 

\n\nIn light of this huge jump, it has come to my attention that its time I made a support server, for people who have questions about the bot, or want to help me keep improving it! So here it is, **Guill's Support Server**! Invite to this server is linked below. I have also added 2 new commands to get input from you guys! Just use \`/help\` and view the Development section. I am still actively adding to the bot, and my next big addition to this will be Realmeye Trades, if I can figure out how to do so! 

\n\nOnce again, a big thanks to all of you for supporting this bot, and keeping me motivated to keep adding to it! Hope you guys have a great day!

\n\n**Links:**
\nReddit Post: https://www.reddit.com/r/RotMG/comments/8vygzj/guill_new_rotmg_discord_bot/?st=jjhmkegy&sh=6b6d76ad
\nSupport Server Invite: https://discord.gg/3Gby6sT


`)
})

}
if (msg.content.toLowerCase().startsWith(prefix + 'addemoji')) {
   if (msg.author.id != '368756694114893825') return; 
    let guild = msg.guild;
    let toAdd = args[2];
    let title = args[1];

    if(!title || !toAdd) {
        return msg.channel.send('Please provide name and url for the emoji to add. Ex: >>addemoji <name> <url>');
    } else {
        guild.createEmoji(toAdd, title)
        .then(emoji => msg.react(emoji))
        .catch(console.log('Something went wrong.'));
      
    }
  }
if (msg.content.startsWith('/serverinfo')) {
   

    msg.guild.fetchMembers();
    
    let members = msg.guild.members;
    let online = members.filter(m => m.user.presence.status === 'online').size
    const offline = members.filter(m => m.user.presence.status === 'offline').size
    const dnd = members.filter(m => m.user.presence.status === 'dnd').size
    const idle = members.filter(m => m.user.presence.status === 'idle').size
    const streaming = members.filter(m => m.user.presence.game ? m.user.presence.game.streaming === true : false).size
    online = online - streaming;


  //  message.channel.send(`<a:online:464867216668753931> ${online}\n<a:idle:464867250269061120> ${idle} \n<a:dnd:464867303176142849> ${dnd}\n<a:streaming:464867426090090504> ${streaming}\n<a:offline:464867377767645195> ${offline}`);

    //getting roles and formatting it
    const roles = msg.guild.roles.map(r => r.id)
    let roleLength = roles.length;
    var i = 0;
    var RoleList = "";
    for(; i < roleLength; i++) {
      RoleList += "<@&" + roles[i] + "> | "
    }
    //getting server age
    var now = new Date().getTime();
    var countDownDate = msg.guild.createdTimestamp;
    var distance = now - countDownDate;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let time = days + "d " + hours + "h " + minutes + "m ago";

    //getting Emojis
    var emojiList = msg.guild.emojis.map(e=>e.toString()).join(" ");
    if (emojiList.length > 1000) {
    emojiList = "Too many emojis <:oof:466692716563005452>"
    }
    if (emojiList.length < 2) {
    emojiList = "No emojis on this server <:oof:466692716563005452>"
    }

    //checking if embed is to long
    if (RoleList.length > 1000) {
        RoleList = "Too many roles <:ono:464908543984795648>"
    }

    //sending the info
    const info = new Discord.RichEmbed()
        .setColor(0x000000)
        .setFooter(" © Droid & Co", client.user.avatarURL)
        .setTimestamp()
        .setTitle('Server Info')
        .addField("Name" , msg.guild.name, true)
        .addField("Region" , msg.guild.region, true)
        .addField("Owner" , "<@" + msg.guild.ownerID + ">")
        .addField("Created", time)
        .addField("Members (" + msg.guild.memberCount + ")", "\n<a:online:464867216668753931> " + online + "\n<a:idle:464867250269061120> "+ idle + "\n<a:dnd:464867303176142849> "+ dnd + "\n<a:streaming:464867426090090504>"  + streaming + "\n<a:offline:464867377767645195> " + offline, true)
        .addField("Verification Level", msg.guild.verificationLevel,true)
        .addField("Roles", RoleList)
        .addField("Emojis" , emojiList)
  msg.channel.send(info).catch(error => {});

    //<a:streaming:464867426090090504>
  }
  
  if (msg.content.startsWith(prefix + 'stats')) {
    msg.channel.send(`\`\`\`asciidoc\n= STATISTICS =
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}\`\`\``);
}
    
  if (msg.content.toLowerCase().startsWith(prefix + 'suggest')) {
  var suggestion = args.slice(1).join(' ');
  if (!suggestion) return msg.channel.send({
        embed: {
          color: 0xFF0000,
          description: "<:warn:459473619613908994> You did not provide a suggestion!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      msg.delete();
      msg.channel.send({
        embed: {
          color: 0x32CD32,
          description: "<:boxouticon:459473618645286919> Your suggestion has been sent! Thanks for taking the time to review me!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      client.channels.get('466727960624365569').send({
        embed: {
          color: 0x32CD32,
          description: `<:signaddicon:459473619618365441> **New Suggestion**\n\nUser: ${msg.author.tag} | ${msg.author}\n\nSuggestion: ${suggestion}`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
  }
  if (msg.content.toLowerCase().startsWith(prefix + 'feedback')) {
  var feedback = args.slice(1).join(' ');
  if (!feedback) return msg.channel.send({
        embed: {
          color: 0xFF0000,
          description: "<:warn:459473619613908994> You did not provide any feedback!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      msg.delete();
      msg.channel.send({
        embed: {
          color: 0x32CD32,
          description: "<:boxouticon:459473618645286919> Your feedback has been sent! Thanks for taking the time to review me!",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
      client.channels.get('466728003397746700').send({
        embed: {
          color: 0x32CD32,
          description: `<:signaddicon:459473619618365441> **New Feedback**\n\nUser: ${msg.author.tag} | ${msg.author}\n\nSuggestion: ${feedback}`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
      })
  }
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
              finalchars += " <:backpack:462699732884783134>"
            }
            finalchars += `\nBase <:fame:456347834908672030>: **${chars[i].fame}**`
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
            "url": "https://static.drips.pw/rotmg/wiki/Consumable/Other/Char%20Slot%20Unlocker.png"
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
        
      } else {
        test['h'] = `hidden`
        console.log(test['h'])
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
  if (msg.content.toLowerCase().startsWith(prefix + 'keylist')) {

        snekfetch.get('http://www.tiffit.net/RealmInfo/api/nexusitems?c=keys').then(s=>  {
        var i;
        var keylist = "";
        for (i in s.body.item) {
      
        keylist += `**${s.body.item[i].name}**`
        keylist += ", "
        }
       msg.channel.send({
          embed: {
            color: 0xEAC70D,
            author: {
            name: "List of Available Keys"
          },
            description: keylist,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        
       });
        

        


}
  if (msg.content.toLowerCase().startsWith(prefix + 'key')) {
 
 // for makeing sure key cmd doesnt cross with keys cmd
 if (msg.content.toLowerCase().startsWith(prefix + 'keylist')) return;

 
 
  test['keycheck'] = 'notfound'
  var keysearch = args.slice(1).join(' ');
  if (!keysearch) return msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> Please provide a key type to search for!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        let keyapi = 'http://www.tiffit.net/RealmInfo/api/nexusitems?c=keys'
        snekfetch.get(keyapi).then(k=> {
        for (i in k.body.item) {
        var currkey = k.body.item[i].name
        if (currkey.toLowerCase().includes(keysearch.toLowerCase())) {
        msg.channel.send({
        embed: {
          color: 0xEAC70D,
          author: {
            name: "Key Searcher"
          },
          fields: [{
              name: "Key Found! <:myskey:466286634590142464>",
              value: `${k.body.item[i].name}`
            },
            {
              name: "Cheapest Location",
              value: `${k.body.item[i].price} <:coin:463847187957415946> at ${k.body.item[i].cheapest_on}`,
              inline: true
            },
            {
              name: "Supply",
              value: `${k.body.item[i].quantity} left`,
              inline: true
            },
            {
            name: "Time Left",
            value: `${k.body.item[i]['Time Left']} Minutes`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid"
          },
          thumbnail: {
            "url": "https://static.drips.pw/rotmg/wiki/Consumable/Keys/Diamond%20Mystery%20Key.png"
          }
        }
      });
        test['keycheck'] = 'found'
        return;
        }
        
        }
        if (test['keycheck'] == 'notfound') return msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> The Key with the specified name was **not found**. Either the key is not currently for sale, or you have provided incorrect details!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        
        
        })
  
  }
  if (msg.content.toLowerCase().startsWith(prefix + 'egg')) {
  var rarity = args[1]
  var type = args[2]
  if (!rarity) return msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> Please provide a pet rarity.\n```asciidoc\n= Accepted Rarity Types =\n[Uncommon] [Rare] [Legendary]\n```",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
 if (!type) return msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> Please provide a pet family.\n```asciidoc\n= Accepted Family Types =\n[Feline] [Canine] [Avian] [Exotic] [Farm] [Woodland] [Reptile] [Insect] [Penguin] [Aquatic] [Spooky] [Humanoid] [????] [Automaton] [Mystery]\n```",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        
        let eggapi = 'http://www.tiffit.net/RealmInfo/api/nexusitems?c=pets'
        test['eggcheck'] = 'notfound'
        snekfetch.get(eggapi).then(p=> {
        for (i in p.body.item)
        if (p.body.item[i].name.toLowerCase().includes(`${rarity.toLowerCase()} ${type.toLowerCase()}`)) {
        msg.channel.send({
        embed: {
          color: 0xFFD0E7,
          author: {
            name: "Egg Searcher"
          },
          fields: [{
              name: "Egg Found! <a:eggs:463883553663614978>",
              value: `${p.body.item[i].name}`
            },
            {
              name: "Cheapest Location",
              value: `${p.body.item[i].price} <:coin:463847187957415946> at ${p.body.item[i].cheapest_on}`,
              inline: true
            },
            {
              name: "Supply",
              value: `${p.body.item[i].quantity} left`,
              inline: true
            },
            {
            name: "Time Left",
            value: `${p.body.item[i]['Time Left']} Minutes`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Droid"
          },
          thumbnail: {
            "url": "https://i.imgur.com/GlWHeLf.gif"
          }
        }
      });
      test['eggcheck'] = 'found'
        
        }
        if (test['eggcheck'] == 'notfound') return msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> The Egg with the specified details was **not found**. Either the egg is not currently for sale, or you have provided incorrect details!\n```asciidoc\n= Accepted Family Types =\n[Feline] [Canine] [Avian] [Exotic] [Farm] [Woodland] [Reptile] [Insect] [Penguin] [Aquatic] [Spooky] [Humanoid] [????] [Automaton] [Mystery]\n```\n```asciidoc\n= Accepted Rarity Types =\n[Uncommon] [Rare] [Legendary]\n```",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        
        
        })
  
  }
  
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
            name: "Cheapest Backpack"
          },
          fields: [{
              name: "Location",
              value: `${cheapest}`
            },
            {
              name: "Price",
              value: `${price} <:coin:463847187957415946>`
            },
            {
              name: "Supply",
              value: `${quantity} left`
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
          description: "Guill is discord bot for RotMG Players to use for convenience. It makes fetching user and guild info easier and presentable, and overall improves players' experience with the game!\nTo see what commands this bot has to offer, type `/help` in a channel!\nTo invite this bot to your server, type `/invite`",
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
          },
                   {
                     name: "Special Thanks to",
                     value: "`XkijuX#6667` for designing the `/serverinfo` command"
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
  if (msg.content.toLowerCase().startsWith(prefix + '8ball')) {
  var sayings = ["It is certain",
										"It is decidedly so",
										"Without a doubt",
										"Yes, definitely",
										"You may rely on it",
										"As I see it, yes",
										"Most likely",
										"Outlook good",
										"Yes",
										"Signs point to yes",
										"Reply hazy try again",
										"Ask again later",
										"Better not tell you now",
										"Cannot predict now",
										"Concentrate and ask again",
										"Don't count on it",
										"My reply is no",
										"My sources say no",
										"Outlook not so good",
"Very doubtful"];
var question = args.slice(1).join(' ');
if (!question) return msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> Please ask a question for the :8ball:",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
        var result = Math.floor((Math.random() * sayings.length) + 0);
        msg.channel.send({
          embed: {
            color: 0x000000,
            description: `<:signquestionicon:459473621304213525> ${question}\n\n:8ball: ${sayings[result]}`,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Droid & Co."
            }
          }
        })
  }
  if (msg.content.toLowerCase().startsWith(prefix + 'ping')) {
    msg.channel.send("Pinging... :signal_strength:").then(sent => {
      sent.edit(`:ping_pong: Pong! | Time Taken: ${sent.createdTimestamp - msg.createdTimestamp}ms`)
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
          name: "<a:oryx:466283523691642890> RotMG",
          value: "```css\n(player) (chars) (guild) (gmembers) (backpack) (egg) (key) (keylist)```"
          },
          {
          name: "<a:finaldundie:466655044956061706> Fun",
          value: "```css\n(8ball) (ping)```"
          },
          {
          name: "<:terminalicon:459473619735674890> Development",
          value: "```css\n(suggest) (feedback)```"
          },
          {
          name: "<:info:459473619530285057> Information",
          value: "```css\n(help) (info) (stats) (serverinfo) (invite)```"
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
if (param == 'suggest') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Suggestion Command**\nFunction: Sends your suggestion to the support server for review!\nUsage: `/suggest <suggestion>`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'feedback') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Feedback Command**\nFunction: Sends your feedback to the support server for review!\nUsage: `/feedback <feedback>`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'keylist') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Keys Command**\nFunction: Sends a list of keys available for purchase at the time.\nUsage: `/keylist`\n\nNote: Use `/key <name of key>` for more information on the particular key",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'ping') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Ping Command**\nFunction: Checks if bot is online and returns the signal delay.\nUsage: `/ping`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == '8ball') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**8ball Command**\nFunction: Asks the magical <a:ult8ball:466317137951326208> a question!\nUsage: `/8ball <question>`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
    if (param == 'stats') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Statistics Command**\nFunction: Get some statistics about the bot and it's current usage!\nUsage: `/stats`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
    if (param == 'serverinfo') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Server-Info Command**\nFunction: Show some information about the server you're in!\nUsage: `/serverinfo`",
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
if (param == 'key') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Key Searcher**\nFunction: Searches for a key with the specified name and provides information on sale location\nUsage: `/key <key name>`",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
if (param == 'egg') return msg.channel.send({
  embed: {
  color: 0x000000,
  description: "**Egg Searcher**\nFunction: Searches for the egg with the specified details and provides information for the egg!\nUsage: `/egg <rarity> <family>`\n```asciidoc\n= Accepted Family Types =\n[Feline] [Canine] [Avian] [Exotic] [Farm] [Woodland] [Reptile] [Insect] [Penguin] [Aquatic] [Spooky] [Humanoid] [????] [Automaton] [Mystery]\n```\n```asciidoc\n= Accepted Rarity Types =\n[Uncommon] [Rare] [Legendary]\n```",
  timestamp: new Date(),
  footer: {
  icon_url: client.user.avatarURL,
            text: "© Droid & Co."
          }
        }
})
msg.channel.send({
          embed: {
            color: 0xFF0000,
            description: "<:warn:459473619613908994> Please provide a valid command name.\nType `/help` for a list of commands",
            timestamp: new Date(),
            footer: {
              text: "© Droid & Co."
            }
          }
        })
  
  }
  
}) // end message handler
fs.writeFile('./test.json', JSON.stringify(test), console.error);
client.login(process.env.BOT_TOKEN)
