module.exports = (client,old, channel) => {
  client.mysql = require("../mysql/db.js");

  if (channel.type == "category") {
    client.mysql.querySql(
      "delete from category_channel where category_id = ?",
      [channel.id]
    );
  }
  if (channel.type == "text") {
    client.mysql.querySql("delete from text_channel where channel_id = ?", [
      channel.id,
    ]);
  }
  if (channel.type == "voice") {
    client.mysql.querySql("delete from voice_channel where voice_id = ?", [
      channel.id,
    ]);
  }
  if (channel.type == "category") {
    client.mysql.querySql("call insert_category(?,?,?,?);", [
      channel.id,
      channel.name,
      channel.position,
      channel.guild.id,
    ]);
  }
  if (channel.type == "text") {
    client.mysql.querySql("call insert_channel(?,?,?,?,?,?);", [
      channel.id,
      channel.name,
      channel.position,
      channel.guild.id,
      channel.nsfw,
      channel.parentID,
    ]);
  }
  if (channel.type == "voice") {
    client.mysql.querySql("call insert_voice(?,?,?,?,?);", [
      channel.id,
      channel.name,
      channel.position,
      channel.guild.id,
      channel.parentID,
    ]);
  }
};
