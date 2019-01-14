const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");


let prefix = config.prefix;

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));




client.on('ready', () => {
client.user.setActivity('bot en heroku', {type: 'WATCHING'});
console.log('Listo!');
client.user.setPresence({
        status: "online",
        game: {
            name: "Asylum",
            type: "PLAYING"
        }
    });
});
client.on("guildMemberAdd", (member) => {
    let canal = client.channels.get('530814993411604480');
    canal.send(`Hola ${member.user}, Welcome to the clan ${member.guild.name} We hope you become one of ours.`);

});

client.on("guildMemberRemove", (member) => {
    let canal = client.channels.get('530814993411604480');
    canal.send(`${member.user}, Green light, you're dead bye bye hahahahahaha.`);

});

















client.on("message", (message) => {
  if (message.content.startsWith(prefix+"ping")) {
         let ping = Math.floor(message.client.ping);
         message.channel.send(':ping_pong: `'+ping+' ms.` desde heroku.');

     }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();



if(command === "ping") {
  let ping = Math.floor(message.client.ping);
message.channel.send(":ping_pong: Pong!, "+ ping + "ms");

}

if(command === "server") {
  var server = message.guild;

  const embed = new Discord.RichEmbed()
      .setThumbnail(server.iconURL)
      .setAuthor(server.name, server.iconURL)
      .addField('ID', server.id, true)
      .addField('Region', server.region, true)
      .addField('Creado el', server.joinedAt.toDateString(), true)
      .addField('Dueño del Servidor', server.owner.user.tag +'('+server.owner.user.id +')', true)
      .addField('Miembros', server.memberCount, true)
      .addField('Roles', server.roles.size, true)
      .setColor(0x66b3ff)

  message.channel.send({ embed });

}


if(command === "ban") {
let mencionado = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if(!mencionado) return message.reply('No ha mencionando a ningún miembro.');
if(!razon) return message.channel.send('Escriba una razón del uso de ban.');

message.guild.member(mencionado).ban(razon);
message.channel.send(`**${mencionado.username}**, fue baneado del servidor, razón: ${razon}.`);
}


if(command === "purge") {
let cantidad = parseInt(args[0]);
message.channel.bulkDelete(cantidad);
}


if(command === "help") {
message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');

const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Ping', 'Compueba la latencia del BOT con la API de discord', true)
    .addField('Avatar', 'Muestra el avatar de un usuario', true)
    .addField('Server', 'Muestra información de un servidor', true)
    .addField('Ban', 'Banear a un usuario del servidor incluye razon.', true)
    .addField('Kick', 'Patear a un usuario del servidor incluye razon.', true)
    .addField('Invitacion', '[Link de invitacion](https://discord.gg/VxwER6t)', true)
    .setFooter("Version 1.0", client.user.avatarURL)
    .setColor(0x66b3ff)

message.author.send({ embed });
}










if(command === "avatar") {
  let miembro = message.mentions.users.first()
if (!miembro) {
    const embed = new Discord.RichEmbed()
        .setImage(`${message.author.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${message.author.tag}`);
    message.channel.send({ embed });

} else {
    const embed = new Discord.RichEmbed()
        .setImage(`${miembro.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${miembro.tag}`);

    message.channel.send({ embed });

};
}






if(command === "encuesta") {
let nombre = args[0];
let edad = args[1];
let color = args[2];

message.channel.send(`Hola ${nombre}, tienes ${edad} años y te gusta el color ${color}.`);
}

switch (command){
    case "ping":
        message.channel.send('Pong!');
        break;
    case "hola":
        message.channel.send('Hola como estas?');
        break;
}

  if(message.content.startsWith(prefix + "emblem")) {
    const embed = new Discord.RichEmbed()
    .setTitle("Este es su título, puede contener 256 caracteres")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
    .setFooter("Pie de página, puede contener 1024 caracteres", client.user.avatarURL)
    .setImage(message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setURL("https://github.com/CraterMaik")
    .addField("Este es un título de campo", "Este es un valor de campo puede contener 1024 caracteres.")
    .addField("Campo en línea", "Debajo del campo en línea",  true)
    .addBlankField(true)
    .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);

message.channel.send({embed});
}

});

client.login(config.token);
