import { commandList } from './commands';

// import { fs } from 'node:fs';
// import { path } from 'node:path';
import { REST, Routes, Client, Events, Partials, GatewayIntentBits } from 'discord.js';

const dotenv = require('dotenv');
dotenv.config();

let TOKEN = process.env.TOKEN ?? ''; // «Вытаскиваем» из него токен
let CLIENT_ID = process.env.CLIENT_ID ?? ''; // «Вытаскиваем» из него префикс

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Публикация команд
// try {
//   console.log('Started refreshing application (/) commands.');

//   (async () => {
//     await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commandList });
//   })();

//   console.log('Successfully reloaded application (/) commands.');
// } catch (error) {
//   console.error(error);
// }

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
  GatewayIntentBits.MessageContent], partials: [
    Partials.Channel,
    Partials.Message
  ] });

client.once(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

// Обработка команд
// client.on(Events.InteractionCreate, async interaction => {
//   console.log('interaction', interaction);
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'sosal') {
//     await interaction.reply('Да!');
//   }

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pons!');
//   }
// });

client.on(Events.MessageCreate, async (message) => {
  console.log('message', message);

  if (message.author.id === CLIENT_ID) {
    return;
  }

  if (message.content.toLowerCase().includes('сосал?')) {
    await message.reply("сосал");
  }
});

client.login(TOKEN);