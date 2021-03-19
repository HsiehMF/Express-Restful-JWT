const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://localhost:27017/mvc-with-express', {useNewUrlParser: true, useUnifiedTopology: true});

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    groupName: { 
        type: String,
        required: true
    },
    description: {
        type: String,
    }
})

module.exports = mongoose.model('Group', groupSchema)