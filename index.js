const Discord = require('discord.js');
const mc = require('mc-ping-updated');

const client = new Discord.Client();
const prefix = '!'; // Replace with your desired prefix
const serverIp = 'Glorified.us'; // Replace with your Minecraft server IP

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('Minecraft server status', { type: 'WATCHING' });
  updateStatus();
  setInterval(updateStatus, 300000); // Update every 5 minutes
});

function updateStatus() {
  mc(serverIp, 25565, (err, res) => {
    if (err) {
      console.error(err);
      client.user.setActivity('Error fetching server status');
    } else {
      const players = res.players.online;
      const maxPlayers = res.players.max;
      const status = `Players: ${players}/${maxPlayers}`;
      client.user.setActivity(status, { type: 'PLAYING' });
    }
  });
}

client.login('your-bot-token');
