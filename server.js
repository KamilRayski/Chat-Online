const express = require("express")
const app = express()
const PORT = 3000;
let qs = require('querystring');

app.use(express.static('static'))
app.use(express.urlencoded({ extended: true }))

let clients = []

app.post('/long-poll', (req, res) => {
  clients.push(res);
});

app.post('/message', (req, res) => {
  console.log(req.body)
  clients.forEach(client => {
    client.send(req.body);
  });
  clients.length = 0;
  res.end();
});

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT)
})