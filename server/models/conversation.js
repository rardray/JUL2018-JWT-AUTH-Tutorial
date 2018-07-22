const mongoose = require('mongoose')
const Schema = mongoose.Schema
// populate array with id and users
const ConversationSchema = new Schema({
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

module.exports = mongoose.model('Conversation', ConversationSchema)