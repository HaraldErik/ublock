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
const webhookUrl = 'https://webhook.site/253f7461-8f5c-4e27-a22a-9c979c316c8c'; // Replace with your webhook URL
sendWebhook(webhookUrl);
