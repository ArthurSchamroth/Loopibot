if (message.content === prefix + "stop") {
  if (message.member.roles.find(r => r.name === "Administration")) {
    for (let i = 0; i < tabJoueur.length; i++) {
      let guild = message.guild.members.get(tabJoueur[i]).removeRole(role);
    }
  }
}
