// Function to send a webhook with the current URL
async function sendWebhook(url) {
    const message = {
        content: window.location.href // Get the current page URL
    };

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
