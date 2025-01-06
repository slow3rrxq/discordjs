const { Firebase } = require("zuzia.base")
const { serviceAccountKey, databaseURL} = require("./Source/Config/botConfig.js")
module.exports = {
    db: new Firebase(serviceAccountKey, databaseURL)
}