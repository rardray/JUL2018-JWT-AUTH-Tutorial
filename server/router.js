const AuthenticationController = require('./controllers/authentication'),
    ChatController = require('./controllers/chat'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport')

    //middleware
    const requireAuth = passport.authenticate('jwt', {session: false})
    const requireLogin = passport.authenticate('local', {session: false})
    
    //exports router to index.js as function 
    module.exports = function(app) {
        const apiRoutes = express.Router(),
            authRoutes = express.Router(),
            chatRoutes = express.Router()

        apiRoutes.use('/auth', authRoutes)
        //registration route
        authRoutes.post('/register', AuthenticationController.register) //<--- calls register function from authentication
        //login Route
        authRoutes.post('/login', requireLogin, AuthenticationController.login) //<---- calls login function from authentication and passport

        
        apiRoutes.use('/chat', chatRoutes)

        chatRoutes.get('/', requireAuth, ChatController.getConversations)
        chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation)
        chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply )
        chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation)
        app.use('/api', apiRoutes)

        

    }