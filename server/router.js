const AuthenticationController = require('./controllers/authentication'),
    express = require('express'),
    passportService = require('./config/passport'),
    passport = require('passport')

    //middleware
    const requireAuth = passport.authenticate('jwt', {session: false})
    const requireLogin = passport.authenticate('local', {session: false})

    module.exports = function(app) {
        const apiRoutes = express.Router(),
            authRoutes = express.Router()

        apiRoutes.use('/auth', authRoutes)
        //registration route
        authRoutes.post('/register', AuthenticationController.register)
        //login Route
        authRoutes.post('/login', requireLogin, AuthenticationController.login)

        app.use('/api', apiRoutes)

    }