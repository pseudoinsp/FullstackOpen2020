const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./user_test_helper')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
        let userObject = new User(user)
        await userObject.save()
    }
})

describe('adding a user', () => {
    test('is successful if the user to add is valid', async () => {

        await api
            .post('/api/users')
            .send(helper.validUserToAdd)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtTheEnd = await helper.usersInDB()
        expect(usersAtTheEnd).toHaveLength(helper.initialUsers.length + 1)
        
        const createdUser = usersAtTheEnd.find(b => b.username === helper.validUserToAdd.username)
        expect(createdUser).toBeDefined()
    })

    test('is unsuccessful if the user has short password', async () => 
        await api
            .post('/api/users')
            .send(helper.userWithShortPassword)
            .expect(400)
            .expect(res => {
                JSON.stringify(res.body.error).includes('password')
            })
    )

    test('is unsuccessful if the user has short username', async () => 
        await api
            .post('/api/users')
            .send(helper.userWithShortName)
            .expect(400)
            .expect(res => {
                JSON.stringify(res.body.error).includes('username')
            })
    )

    test('is unsuccessful if the user has non-unique username', async () => 
        await api
            .post('/api/users')
            .send(helper.initialUsers[0])
            .expect(400)
            .expect(res => {
                JSON.stringify(res.body.error).includes('username')
            })
    )

    test('is unsuccessful if the user has no password', async () => 
        await api
            .post('/api/users')
            .send(helper.userWithNoPassword)
            .expect(400)
            .expect(res => {
                JSON.stringify(res.body.error).includes('password')
            })
    )

    test('is unsuccessful if the user has no username', async () => 
        await api
            .post('/api/users')
            .send(helper.userWithNoUsername)
            .expect(400)
            .expect(res => {
                JSON.stringify(res.body.error).includes('username')
            })
    )
})

afterAll(() => {
    mongoose.connection.close()
})