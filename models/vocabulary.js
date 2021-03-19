const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://localhost:27017/mvc-with-express', {useNewUrlParser: true, useUnifiedTopology: true})

const vocabularySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vocabulary: {  
        type: String,
        required: true
    },
    vocDefinition: {  
        type: String,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
})

module.exports = mongoose.model('Vocabulary', vocabularySchema)