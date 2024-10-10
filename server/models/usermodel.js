const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
});

module.exports=mongoose.model('user',userschema);