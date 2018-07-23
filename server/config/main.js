module.exports = {
    'secret': 'secret-catchphrase',
    'database': 'mongodb://localhost:27017/jwttutorial',
    'port': process.env.PORT || 3001
}

//configuration options could be placed in index.js database could be put directly in mongoose.on