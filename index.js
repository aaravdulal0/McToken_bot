console.log("FILE STARTED");

require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

console.log("DOTENV LOADED");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("BOT IS ONLINE");
});

client.login(process.env.MTQ5MzkyNDcxODk0NzA3NDA5OA.GBuIvX.gXhQmuB0N9OhY1yWRrGCJdiL00bkDdPWhPkqp8
            );
