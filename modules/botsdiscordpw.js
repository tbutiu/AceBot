const unirest = require('unirest')
const fs = require('fs')
const yaml = require('js-yaml')
const botListConfig = yaml.safeLoad(fs.readFileSync('./config/botlist.yml', 'utf8'))

module.exports = function (client) {
  var totalGuilds
  if (!client.shard) {
    totalGuilds = { 'server_count': client.guilds.size }
  } else {
    totalGuilds = { 'server_count': client.guilds.size, 'shard_id': client.shard.id, 'shard_count': client.shard.count }
  }
  unirest.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
    .headers({ 'Authorization': botListConfig.BotsDiscordPw.token, 'Content-Type': 'application/json' })
    .send(totalGuilds)
    .end(function () { client.log.info('Servercount sent to http://bots.discord.pw.') })
}
