const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
console.log("env key", process.env.KEY);
app.post('/task/logs', (req, res) => {
  const taskPayload = req.body;

  console.log('Task received:', taskPayload);
  console.log("env key", process.env.KEY2);
  // Perform your task logic here

  res.status(200).send('Task completed!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Worker running on port ${PORT}`);
});
