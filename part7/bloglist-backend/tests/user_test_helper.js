const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const initialUsers = [
    {
        _id: '4a422aa71b54a676234d17f0',
        username: 'testJimmy',
        name: 'testJim',
        password: 'testjimmythebest',
        __v: 0
    },
    {
        _id: '7a422aa71b54a676234d17f1',
        username: 'testIvy',
        name: 'testEve',
        password: 'testivythebest',
        __v: 0
    }
]

const validUserToAdd = {
    _id: '4a422aa71b54a676234d17fd',
    username: 'testTimur',
    name: 'testTimmy',
    password: 'testtimmythebest',
    __v: 0
}

const userWithShortName = {
    _id: '4a422aa71b54a676234d17fd',
    username: 'yo',
    name: 'testJoe',
    password: 'testyothebest',
    __v: 0
}

const userWithShortPassword = {
    _id: '4a422aa71b54a676234d17fa',
    username: 'testTimur',
    name: 'testTimmy',
    password: 'te',
    __v: 0
}

const userWithNoPassword = {
    _id: '4a422aa71b54a676234d17fa',
    username: 'testTimur',
    name: 'testTimmy',
    __v: 0
}

const userWithNoUsername = {
    _id: '3a422aa71b54a676234d17fa',
    name: 'testTimmy',
    password: 'testjimmythebest',
    __v: 0
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const bearerTokenForFirstUser = () => {
    const userForToken = {
        username: initialUsers[0].username,
        id: initialUsers[0]._id,
    }

    return jwt.sign(userForToken, config.SECRET)
}
  
module.exports = {
    usersInDB, initialUsers, validUserToAdd, userWithShortName, userWithShortPassword, userWithNoPassword, userWithNoUsername, bearerTokenForFirstUser
}