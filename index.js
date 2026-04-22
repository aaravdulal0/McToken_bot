console.log("FILE STARTED");
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`${client.user.tag} is ONLINE 🚀`);
});

// Load systems
require("./systems/chatCommands")(client);

client.login(process.env.MTQ5MzkyNDcxODk0NzA3NDA5OA.GBuIvX.gXhQmuB0N9OhY1yWRrGCJdiL00bkDdPWhPkqp8);
