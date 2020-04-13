exports.run = (client, message, args) => {
  function clean(text){
    if(typeof text === "string"){
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    }
  }


  if (message.author.id !== "300304215467622400") return undefined;
  const code = args.join(" ");
  const evaled = eval(code);
  const cleanCode = await clean(evaled);
  message.channel.send(cleanCode, { code: "js" });
};
