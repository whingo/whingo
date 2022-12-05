const Discord = require('discord.js');
const client = new Discord.Client();

// Create a Map to store the guilds and their members
const guilds = new Map();

client.on('message', message => {
  // Check if the message is a command to create a guild
  if (message.content.startsWith('!create-guild')) {
    // Get the name of the guild from the command
    const guildName = message.content.split(' ')[1];

    // Check if the guild already exists
    if (guilds.has(guildName)) {
      message.channel.send(`Guild with name "${guildName}" already exists.`);
      return;
    }

    // Create the guild and add the user who sent the command as the leader
    guilds.set(guildName, {
      leader: message.author,
      members: [message.author],
    });

    // Use the Discord API to create a new role for the guild
    message.guild.createRole({
      name: guildName,
      color: 'BLUE',
    });

    // Add the user who sent the command to the guild's role
    message.member.addRole(guildName);

    message.channel.send(`Guild "${guildName}" has been created and you have been added as the leader.`);
  }

  // Check if the message is a command to join a guild
  if (message.content.startsWith('!join-guild')) {
    // Get the name of the guild from the command
    const guildName = message.content.split(' ')[1];

    // Check if the guild exists
    if (!guilds.has(guildName)) {
      message.channel.send(`Guild with name "${guildName}" does not exist.`);
      return;
    }

    // Add the user who sent the command to the guild's members list
    const guild = guilds.get(guildName);
    guild.members.push(message.author);

    // Use the Discord API to add the user to the guild's role
    message.member.addRole(guildName);

    message.channel.send(`You have joined guild "${guildName}".`);
  }

  // Check if the message is a command to leave a guild
  if (message.content.startsWith('!leave-guild')) {
    // Get the name of the guild from the command
    const guildName = message.content.split(' ')[1];

    // Check if the guild exists
    if (!guilds.has(guildName)) {
      message.channel.send(`Guild with name "${guildName}" does not exist.`);
      return;
    }

    client.login('MTA0OTE5MTQyNDc0ODQyNTI1Ng.G4lmiY.xArkVGwQzp_6dMjSh01GGcmBb2M24eNz7Bb7qg');
    
