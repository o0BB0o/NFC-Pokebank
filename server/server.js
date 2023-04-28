const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Import the cors package

// Middleware for parsing JSON in the request body
app.use(cors());
app.use(bodyParser.json());

const fs = require('fs');
const net = require("net");

const PORT = process.env.PORT || 3001;
var server_port = "65432"
var server_addr = "192.168.50.233"

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

app.get('/api/nfc', (req, res) => {
  const net = require('net');
  const client = net.createConnection({port:server_port, host:server_addr},() => {
    console.log("connected to server!");
    client.write("0");
  })
  client.on('data',(data) => {
    const pokemon = data.toString();
    console.log("received: " + pokemon);
    res.send(pokemon);
    client.end();
    client.destroy();
  });
});

app.post('/api/swap', (req, res) => {
  const net = require('net');
  const client = net.createConnection({port:server_port, host:server_addr},() => {
    console.log("Trying to send 1!");
    client.write("1");
  })
  client.on('data',(data) => {
    if(data.toString() === "11") {
      sendMessage = req.body;
      sendMessage = JSON.stringify(sendMessage);
      let utf8Encode = new TextEncoder();
      sendMessage = utf8Encode.encode(sendMessage);
      console.log(sendMessage);
      client.write(sendMessage);
      console.log("JOBS DONE");
      res.send("Jobs Done");
      client.end();
      client.destroy();
    }
  });
});

  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});