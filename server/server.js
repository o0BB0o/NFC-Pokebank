const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Import the cors package

// Middleware for parsing JSON in the request body
app.use(cors());
app.use(bodyParser.json());

const fs = require('fs');

const PORT = process.env.PORT || 3001;

app.get('/api/data', (req, res) => {
  fs.readFile('mybank.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
    } else {
      res.send(data);
    }
  });
});

app.post('/api/data', (req, res) => {
    const newData = req.body;
  
    fs.writeFile('mybank.json', JSON.stringify(newData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing data file');
      } else {
        res.send('Data saved successfully');
      }
    });
  });
  
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});