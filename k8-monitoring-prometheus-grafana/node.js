const express = require('express');
const promClient = require('prom-client');

const app = express();
const register = new promClient.Registry();

// Create a default metrics exporter for HTTP requests and process stats
promClient.collectDefaultMetrics({ register });

// Create a custom counter metric
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Example endpoint to simulate HTTP request counting
app.get('/some-endpoint', (req, res) => {
  httpRequestCounter.inc(); // Increment the counter for each request
  res.send('Hello, World!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
