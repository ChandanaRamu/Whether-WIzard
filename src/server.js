const http = require('http');
const fs = require('fs');
const path = require('path');

const apiKey = '6905fd0d26cb0717127a34161cc754e1';
const city = 'London'; // Replace with the desired city

const server = http.createServer((req, res) => {
  const options = {
    hostname: 'api.openweathermap.org',
    path: `/data/2.5/weather?q=${city}&appid=${apiKey}`,
    method: 'GET',
  };

  const request = http.request(options, (response) => {
    let data = '';

    // A chunk of data has been received.
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    response.on('end', () => {
      try {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        // Read HTML content from file
        const htmlContent = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');

        // Replace placeholders in HTML content with actual data
        const finalHtml = htmlContent.replace(/{city}/g, city)
                                    .replace(/{temperature}/g, temperature)
                                    .replace(/{description}/g, description);

        // Send HTML response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(finalHtml);
      } catch (error) {
        console.error('Error while parsing weather data:', error.message);
        // Read HTML content from file for error
        const errorHtmlContent = fs.readFileSync(path.join(__dirname, 'public', 'error.html'), 'utf8');
        // Send HTML response for error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(errorHtmlContent);
      }
    });
  });

  // Handle errors during the request.
  request.on('error', (error) => {
    console.error('Error making weather API request:', error.message);
    // Read HTML content from file for error
    const errorHtmlContent = fs.readFileSync(path.join(__dirname, 'public', 'error.html'), 'utf8');
    // Send HTML response for error
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(errorHtmlContent);
  });

  // End the request.
  request.end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
