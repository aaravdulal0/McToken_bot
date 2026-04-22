const ms = require("ms");

const premiumUsers = new Set(["123456789"]); // premium DB

module.exports = (client) => {

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase();

    // ================= HELP =================
    if (msg === "help") {
      return message.channel.send(`
🤖 McToken Bot Commands:

say <text>
ban @user
kick @user
mute @user
ticket open
giveaway <time> <prize>
premium
`);
    }

    // ================= SAY =================
    if (msg.startsWith("say ")) {
      return message.channel.send(message.content.slice(4));
    }

    // ================= PREMIUM =================
    if (msg === "premium") {
      return message.channel.send(
        premiumUsers.has(message.author.id)
          ? "💎 Premium User"
          : "❌ Not Premium"
      );
    }

    // ================= MODERATION =================
    if (msg.startsWith("ban")) {
      if (!message.member.permissions.has("BanMembers")) return;
      const user = message.mentions.members.first();
      if (!user) return;
      await user.ban();
      message.channel.send("🚫 Banned user");
    }

    if (msg.startsWith("kick")) {
      if (!message.member.permissions.has("KickMembers")) return;
      const user = message.mentions.members.first();
      if (!user) return;
      await user.kick();
      message.channel.send("👢 Kicked user");
    }

    // ================= TICKET SYSTEM =================
    if (msg === "ticket open") {
      const channel = await message.guild.channels.create({
        name: `ticket-${message.author.username}`,
        permissionOverwrites: [
          { id: message.guild.id, deny: ["ViewChannel"] },
          { id: message.author.id, allow: ["ViewChannel", "SendMessages"] }
        ]
      });

      message.channel.send(`🎟️ Ticket created: ${channel}`);
    }

    // ================= GIVEAWAY =================
    if (msg.startsWith("giveaway")) {
      const args = message.content.split(" ");
      const time = args[1];
      const prize = args.slice(2).join(" ");

      if (!time || !prize) return;

      message.channel.send(`🎉 Giveaway: **${prize}**`);

      setTimeout(() => {
        const winner = message.guild.members.cache.random();
        message.channel.send(`🏆 Winner: ${winner.user.tag}`);
      }, ms(time));
    }

    // ================= AUTO MOD =================
    if (msg.includes("http")) {
      if (!message.member.permissions.has("ManageMessages")) {
        message.delete();
        message.channel.send("🚫 Links not allowed");
      }
    }

  });
};
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports.ticketPanel = async (channel) => {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("ticket_open")
      .setLabel("Open Ticket")
      .setStyle(ButtonStyle.Success)
  );

  channel.send({ content: "🎟️ Support Panel", components: [row] });
};
