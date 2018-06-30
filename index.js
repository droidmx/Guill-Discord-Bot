const Discord = require("discord.js");
const client = new Discord.Client();
const snekfetch = require("snekfetch");
const fs = require('fs');
let test = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
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
          test['h'] = `**${leva}** ${abia} • **${levb}** ${abib} • **${levc}** ${abic}`
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
        var guild = r.body.guild
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
          for (i in chars) {
            finalchars += `**${chars[i].stats_maxed}**`
            finalchars += " "
            finalchars += chars[i].class
            if (chars[i].equipment[4]) {
            finalchars += " <:backpack:462699732884783134>"
            }
            finalchars += ` | **${chars[i].fame}** Base <:fame:456347834908672030>`
            finalchars += "\n"
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
    
msg.channel.send({embed: {
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
        name: "Fame <:fame:456347834908672030>",
        value: `Alive: **${fame}** | Account: **${acctfame}**`,
        inline: true
      },
      {
        name: "Guild",
        value: `**${guild}** | Rank: **${guildrank}**`,
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
  }
})// end message handler

client.login(process.env.BOT_TOKEN)

































