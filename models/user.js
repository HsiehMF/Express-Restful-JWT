const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://localhost:27017/mvc-with-express', {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/                 
    },
    password: { 
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('User', userSchema)