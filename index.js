const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/tollguru', async (req, res) => {
  try {
    const tollguruResponse = await fetch('https://apis.tollguru.com/toll/v2/origin-destination-waypoints' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
      body: JSON.stringify(req.body),
    });
    const data = await tollguruResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
