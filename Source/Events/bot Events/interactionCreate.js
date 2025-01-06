const { EmbedBuilder } = require("discord.js");
const bot = global.client;

module.exports = async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = bot.Public.get(interaction.commandName)
  if (!command) return;

  if (!interaction.guild) return interaction.reply({ content: "Komutlarım sunucuya özeldir.", ephemeral: true })

  try {
    await command.execute(interaction, bot);
  } catch (err) {
    if (err) console.error(err);
  }
};

module.exports.conf = {
  name: "interactionCreate",
};
