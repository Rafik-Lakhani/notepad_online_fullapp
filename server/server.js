const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var files =[]

app.post('/filechnage', function (req, res) {
    const file = req.body;
    console.log("Received file data:", file);  // logs the received file
    files=file;
    res.send(JSON.stringify('done'));  // sends a response to the client
});

app.get('/', function (req, res) {
    res.status(201).send(files);
});



app.listen(PORT, () => console.log('listening on port' + PORT));