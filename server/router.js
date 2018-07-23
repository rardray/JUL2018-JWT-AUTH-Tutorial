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
        //registration route * note * stacks on /auth because apiRoutes is root
        authRoutes.post('/register', AuthenticationController.register) //<--- calls register function from authentication
        //login Route
        authRoutes.post('/login', requireLogin, AuthenticationController.login) //<---- calls login function from authentication and passport

        
        apiRoutes.use('/chat', chatRoutes)  //<--- api is root so route stacks as api/chat

        chatRoutes.get('/', requireAuth, ChatController.getConversations) //<--- stacsk on chat as get request to /api/chat ..  gets latest post from chat
        chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation) //<--- api/chat/convoid get specific conversation by convoid
        chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply )  //<--- post method to add new data to conversation by id
        chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation)
        app.use('/api', apiRoutes)

        

    }