const http = require('http');

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

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Current temperature in ${city}: ${temperature}°C, Weather: ${description}`);
      } catch (error) {
        console.error('Error parsing weather data:', error.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error fetching weather data');
      }
    });
  });

  // Handle errors during the request.
  request.on('error', (error) => {
    console.error('Error making weather API request:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error making weather API request');
  });

  // End the request.
  request.end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
