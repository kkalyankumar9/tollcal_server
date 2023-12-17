const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const tollapi = process.env.API_KEY;
 // Using a variable for the API key

app.post('/tollguru', async (req, res) => {
  try {
    const tollguruResponse = await fetch('https://apis.tollguru.com/toll/v2/origin-destination-waypoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': tollapi,  // Using the variable here
      },
      body: JSON.stringify(req.body),
    });
    console.log('API Key:', tollapi); 
    const data = await tollguruResponse.json();
    res.json(data);
  } catch (error) {
    console.log('API Key:', tollapi); 
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
