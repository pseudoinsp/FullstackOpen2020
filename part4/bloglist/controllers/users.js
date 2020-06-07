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

    const sentPassword = request.body.password
    if(!sentPassword || sentPassword.length <= 3) {
        return response.status(400).json({'error': 'password not provided, or less than 3 characters'})
    }

    try
    {
        const passwordHash = await bcrypt.hash(sentPassword, 10)
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