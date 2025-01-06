const fs = require("fs");
const bot = global.client;
fs.readdirSync("./Source/Events/").forEach((folder) => {
  const commandFiles = fs
    .readdirSync(`./Source/Events/${folder}/`)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const event = require(`../Events/${folder}/${file}`);
    bot.on(event.conf.name, event);
  });
});