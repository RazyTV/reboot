// Load up the discord.js library
const Discord = require("discord.js");
const fetch = require('node-fetch');
const { BitlyClient } = require('bitly');



const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users of ${client.guilds.size} guild(s). Waiting for user imput...`);
  client.user.setActivity(`doing the stuff, !cmds`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on("guildMemberAdd", member => {
  console.log(`User ${member.user.username} has despacito server`);
  let jRole =  member.guild.roles.find(`name`, `Users`);
  member.addRole(jRole.id);
  member.guild.channels.get(`463143153323474945`).send(`**` + member.user.username + `**, bienvenido!*`)
});


client.on("message", async message => {
  
  if(message.author.bot) return;

 
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Latency is ${m.createdTimestamp - mess8age.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    if(!message.member.roles.some(r=>["Creator", "Admin", "Users"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["Creator", "Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Error: Higher Role/No Permissions");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["Creator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Error: Higher Role/No Permissions");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "clean") {
    if(!message.member.roles.some(r=>["Admin", "Creator"].includes(r.name)) )
        return message.reply("Bot has detected that you are a normal user if not DM an admin");
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(command === "seta") {
    if(!message.member.roles.some(r=>["Admin", "Creator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
	const setActivity1 = args.join(" ");
	message.delete().catch(O_o=>{});
    client.user.setActivity(setActivity1)
  }
	 if(command === "veer") {
message.reply("1.0")
  }

  if(command === "mw") {
    if (message.member.voiceChannel) {
		var voice = message.member.voiceChannel
      message.member.voiceChannel.join()
        .then(connection => { 
          message.reply('mike wasouski');
         const dispatcher = connection.playFile('./audiofile.mp3');
		  dispatcher.on("end", end => {voice.leave(); });

        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
  
    if(command === "whati") {
    if (message.member.voiceChannel) {
		var voice = message.member.voiceChannel
      message.member.voiceChannel.join()
        .then(connection => { 
          message.reply('Playing a cool song');
         const dispatcher = connection.playFile('./whati.mp3');
		  dispatcher.on("end", end => {voice.leave(); });

        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
  
 
   if(command === "hbfs") {
    if (message.member.voiceChannel) {
		var voice = message.member.voiceChannel
      message.member.voiceChannel.join()
        .then(connection => { 
          message.reply('best song for u');
         const dispatcher = connection.playFile('./hbfs.mp3');
		  dispatcher.on("end", end => {voice.leave(); });

        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
  
    if(command === "ree") {
    if (message.member.voiceChannel) {
		var voice = message.member.voiceChannel
      message.member.voiceChannel.join()
        .then(connection => { 
          message.reply('deleting normies');
         const dispatcher = connection.playFile('./ree.mp3');
		  dispatcher.on("end", end => {voice.leave(); });

        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
  
    if(command === "crab") {
    if (message.member.voiceChannel) {
		var voice = message.member.voiceChannel
      message.member.voiceChannel.join()
        .then(connection => { 
          message.reply('obama is *gone* :crab:');
         const dispatcher = connection.playFile('./crab.mp3');
		  dispatcher.on("end", end => {voice.leave(); });

        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }





    if(command === "about") {
    message.channel.send("`This bot is running: Ubuntu 18.0.1 SERVER`");
	message.channel.send("`Bot Script Version: 2.5.1`");
	message.channel.send("`Bot script made with love by: RayzTV`");
	message.channel.send("`For Slime For Days Discord Server`");
  }

  if(command === "vip") {
  if(!message.member.roles.some(r=>["Creator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user.");
  let gRole = message.guild.roles.find(`name`, `Golden Owls`);
  if(!gRole) return message.reply("Couldn't find that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}



    if(command === "cmds") {
      let bicon = client.user.displayAvatarURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("**User Commands** ")
      .setFooter("reboot | Bot by RayzTV", bicon)
      .setColor("#35A2AF")
      .setThumbnail(bicon)
      .addField("!ping", "If you excecute this command the bot will reply you'r ping and API  ping")
      .addField("!say + <words>", "If you excecute this command the bot will say whatever you want")
      .addField("!about", "If you excecute this command the bot will reply you the Script Info")
	  .addField("!avatar + <mention>", "If you excecute this command the bot will reply you the mentioned user's avatar")
      .addField("!daily", "If you excecute this command the bot will reply you the top post in /r/EarthPorn")
      .addField("!server", "If you excecute this command the bot will reply you some of the Server Info")
    message.channel.send(serverembed);

      if(!message.member.roles.some(r=>["Creator", "Admin"].includes(r.name)) )
          return message.reply("Bot has detected that you are a normal user if not DM an admin");
      let aembed = new Discord.RichEmbed()
      .setDescription("**Admin Commands**")
      .setFooter("reboot | Bot by RayzTV", bicon)
      .setColor("#DF2740")
      .setThumbnail(bicon)
      .addField("!say + <words>", "If you excecute this command the bot will change its activity")
      .addField("!seta", "If you excecute this command the bot will reply you some of the Server Info")
      .addField("!kick + @user + reason", "This command will kick the mentioned user ")
      .addField("!ban + @user + reason", "This command will ban the mentioned user ")
      .addField("!clean + <messages to clean from 2 to 100>", "This command will clean the messages you want")
      .addField("!vip", "This command makes somebody vip")
    message.channel.send(aembed);
  }

    if(command === "server") {


}

    if(command === "daily") {
     
	 const fetch = require('node-fetch');

     fetch('https://www.reddit.com/r/EarthPorn/top.json')
     .then(res=>res.json())
     .then(res=>res.data.children)
     .then(res=>res.map(post=>({
     img: post.data.url 
     })))
     .then(res=>cool(res[0].img))
      
	}

function cool(obj) {
	
	let bicon = client.user.displayAvatarURL;
	let aembed = new Discord.RichEmbed()
      .setDescription("**Today's Photo from /r/EarthPorn**")
      .setColor("#00C8AF")
      .setImage(obj)
    message.channel.send(aembed);
}



    if(command === "daily2") {
     
	 const fetch = require('node-fetch');

     fetch('https://www.reddit.com/r/EarthPorn/top.json')
     .then(res=>res.json())
     .then(res=>res.data.children)
     .then(res=>res.map(post=>({
     img: post.data.url 
     })))
     .then(res=>cool(res[1].img))
      
	}

if(command === "avatar") {
    var member = message.mentions.users.first()
    if(!member)
      return message.reply("Please mention a valid member of this server"); 
	let bicon = client.user.displayAvatarURL;
	let aembed = new Discord.RichEmbed()
      .setDescription("**" + member.username + "'s avatar!**")
      .setColor("#00C8AF")
      .setImage(member.avatarURL)
    message.channel.send(aembed)
  }
  
  function coold(obj, obj2) {
	
	let bicon = client.user.displayAvatarURL;
	let aembed = new Discord.RichEmbed()
      .setDescription("**Today's dankest meme from /r/dankmemes**")
      .setColor("#00C8AF")
      .setImage(obj)
	  .addField("Title:", obj2)
    message.channel.send(aembed);

}



    if(command === "dank") {
     
	 const fetch = require('node-fetch');

     fetch('https://www.reddit.com/r/dankmemes/top.json')
     .then(res=>res.json())
     .then(res=>res.data.children)
     .then(res=>res.map(post=>({
     img: post.data.url,
     tit: post.data.title, 	 
     })))
     .then(res=>coold(res[0].img, res[0].tit ))
      
	}
	

	
if(command === "timer") { 
 let text = message.author
  let time = args.slice(0).join(' ');


setTimeout(timer, time , text, time);

}

	function timer(obj, obj2) {
		    message.channel.send(obj + " ~ Your timer of " + obj2 + "ms, has just ended!");

	}
	
	
if(command === "short") { 
const bitly = new BitlyClient('16c97a8d05eada1026f9c258cc1b59c37d4d403f', {});
 let text = args.join(" ");
 message.delete().catch(O_o=>{});

 bitly
  .shorten(text)
  .then(function(result) {
    message.channel.send("Short URL: " + result.url);
  })
  .catch(function(error) {
    console.error(error);
    console.error(error);
  });

}




});

client.login(config.token);
