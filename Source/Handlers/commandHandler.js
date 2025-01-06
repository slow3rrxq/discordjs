const { token } = require("../Config/botConfig")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");
const chalk = require("chalk")
const bot = global.client;
const times = new Date();

const commands = [];

fs.readdirSync("./Source/SlashCommands/Public/").forEach((folder) => {
  const commandFiles = fs
    .readdirSync(`./Source/SlashCommands/Public/${folder}/`)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const command = require(`../SlashCommands/Public/${folder}/${file}`);
    bot.Public.set(command.data.name, command);
    commands.push(command.data.toJSON());
  });
});

bot.on("ready", () => {
  const CLIENT_ID = bot.user.id;

  const rest = new REST({ version: "10" }).setToken(token);

  (async () => {
    try {
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

      console.log(chalk.blue(`${times.toLocaleString()}`) + (chalk.magenta(` [BOT] `) + chalk.white(`Successfully reloaded application (/) commands.`)));
      console.log(chalk.blue(`${times.toLocaleString()}`) + (chalk.magenta(` [BOT] `) + chalk.white(`Successfully reloaded application [Prefix] commands.`)));
    } catch (error) {
      console.error(error);
    }
  })();
});