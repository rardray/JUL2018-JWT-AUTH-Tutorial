"use strict"
const Conversation = require('../models/conversation')
const Message = require('../models/message')
const User = require('../models/user')

exports.getConversations = function(req, res, next) { //<-- function gets one message from conversation for snippet
    Conversation.find({participants: req.user._id}) //<-- find participant id
    .select('_id')
    .exec(function(err, conversations) {
        if (err) {
            res.send({error: err})
            return next(err)
        }
        let fullConversations = [] //<--- array to store found conversations
        conversations.forEach(function(conversation) {
            Message.find({ 'conversationId' : conversation._id}) // <-- find conversations from found particpants
            .sort('-createdAt') //<-- sort by newest
            .limit(1)
            .populate({ //<--- populates author with result first and last name
                path: 'author',
                select: "profile.firstName profile.lastName"
            })
            .exec(function(err, message) {
                if (err) {
                    res.send({error: err})
                    return next(err)
                }
                fullConversations.push(message) //<-- push results into fullConversations array
                if (fullConversations.length === conversations.length) {
                    return res.status(200).json({conversations: fullConversations})
                }
            })
        })
    })
}

exports.getConversation = (function(req, res, next){  // exported function in routes to retrieve my convo id
    Message.find({conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('-createdAt')
    .populate({
        path: 'author',  // < --- sets first and last name to author field
        select: 'profile.firstName profile.lastName'
    })
    .exec(function(err, messages) {
        if (err) {
            res.send({error: err})
            return next(err)
        }
        res.json({conversation: messages})
    })
})

exports.newConversation = function(req, res, next) { //<--- write new message
    if(!req.params.recipient) {
        res.status(422).send({ error: 'please choose valid recipient'})
    }
    if (!req.body.composedMessage) {
        res.status(422).send({error: 'please enter a message'})
    }
    const conversation = new Conversation({
        participants: [req.user._id, req.params.recipient]
    })
    conversation.save(function(err, newConversation){
        if (err) {
            res.send({error: err})
            return next(err)
        }
        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.composedMessage,
            author: req.user._id
        })
        message.save(function(err, newMessage) {
            if (err) {
                res.send({error: err})
                return next(err)
            }
            res.status(200).json({message: 'Conversation Started', conversationId: conversation._id})
            return next()
        })
    })
}
exports.sendReply = function(req, res, next) {
    const reply = new Message({
        conversationId: req.params.conversationId,
        body: req.body.composedMessage,
        author: req.user._id
    })
    reply.save(function(err, sentReply){
        if (err) {
            res.send({error: err})
        }
        res.status(200).json({message:'Reply sent'})
        return next()
    })
}