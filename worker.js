const express = require('express');
const { PubSub } = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const app = express();

// Middleware to parse Pub/Sub messages
app.use(express.json());

// Endpoint to handle Pub/Sub messages
app.post('/', async (req, res) => {
  const message = req.body.message;

  if (message) {
    const data = Buffer.from(message.data, 'base64').toString();
    console.log(`Received message: ${data}`);
    try {
        let dataJson = JSON.parse(data);

        if(dataJson.action === "newlog") {
            const topicName = 'edukit-logs';
            const message = { text: 'Created by api!',  timestamp: new Date().toISOString() };
            console.log("publishing message to topic", Date.now());
            await publishMessage(topicName, message);
            console.log("message published to topic", Date.now());
        }
    } catch (error) {
        console.log(error);
    }
  } else {
    console.log('No message received!');
  }

  // Acknowledge the message
  res.status(204).send();
});

async function publishMessage(topicName, message) {
    try {
      console.log(Date.now());
      const dataBuffer = Buffer.from(JSON.stringify(message));
      const messageId = await pubSubClient.topic(topicName).publishMessage({ data: dataBuffer });
      console.log(`Message ${messageId} published.`);
      console.log(Date.now());
    } catch (error) {
      console.error(`Error publishing message: ${error.message}`);
    }
  }

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Subscriber service listening on port ${PORT}`);
});