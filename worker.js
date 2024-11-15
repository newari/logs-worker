const express = require('express');

const app = express();

// Middleware to parse Pub/Sub messages
app.use(express.json());

// Endpoint to handle Pub/Sub messages
app.post('/', (req, res) => {
  const message = req.body.message;

  if (message) {
    const data = Buffer.from(message.data, 'base64').toString();
    console.log(`Received message: ${data}`);
  } else {
    console.log('No message received!');
  }

  // Acknowledge the message
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Subscriber service listening on port ${PORT}`);
});