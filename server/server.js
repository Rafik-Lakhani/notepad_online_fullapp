const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const db=require('./models/usermodel')



dotenv.config();
const PORT = process.env.PORT;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var files =[]


app.get('/', async function (req, res) {
    var result=await db.findOne({email:'demo@gmaidddddl9090.fffcom'});
    console.log(result)
    res.status(201).send(result.files[0]);
});

app.get('/user',async function(req,res){
    await db.create({
        username: 'demoddd9fff09ff0',
        password: '123',
        email: 'demo@gmaidddddl9090.fffcom',
        files: []
    })
    console.log('create user')
    res.redirect('/')
})

app.post('/filechnage', async function (req, res) {
    const file = req.body;
    console.log("Received file data:", file);  // logs the received file
    var result= await db.findOneAndUpdate({email:'demo@gmaidddddl9090.fffcom'},{files:file})
    res.status(201).send(JSON.stringify(result.files[0]));  // sends a response to the client
});




app.listen(PORT, () => console.log('listening on port' + PORT));