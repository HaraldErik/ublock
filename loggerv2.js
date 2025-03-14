// loggerv2.js
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Send a "Hello" message to the first text channel of the first guild
    const guild = client.guilds.cache.first(); // Get the first guild
    if (guild) {
        const channel = guild.channels.cache.find(ch => ch.isText() && ch.permissionsFor(client.user).has('SEND_MESSAGES'));
        if (channel) {
            await channel.send('Hello!');
            console.log('Sent "Hello!" message to the channel.');
        } else {
            console.error('No suitable text channel found.');
        }
    } else {
        console.error('No guilds found.');
    }
});

// Function to log in using the token stored in memory
function loginWithToken() {
    const token = window.discordBotToken; // Get the token from memory
    if (token) {
        client.login(token).catch(console.error);
    } else {
        console.error('No Discord bot token found.');
    }
}

// Call the login function
loginWithToken();
