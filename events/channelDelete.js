module.exports = (client, channel) => {
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
};
