const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users.map(user => user.toJSON()))
    }
    catch(exception) {
        next(exception)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try
    {
        const passwordHash = await bcrypt.hash(request.body.password, 10)
        const user = new User({
            username: request.body.username,
            name: request.body.name,
            passwordHash
        })

        const createdUser = await user.save()
        response.status(201).json(createdUser.toJSON())        
    }
    catch(exception) {
        next(exception)
    }
})

module.exports = usersRouter