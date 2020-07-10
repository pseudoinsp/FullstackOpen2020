const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')

console.log('connecting to MongoDB')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]! 
    }

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    
    type Token {
      value: String!
    }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
      addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String!]!
      ): Book
      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks:  async (root, args) => {
        const queriedAuthor = args.author
        const queriedGenre = args.genre

        let filters = []

        if(queriedGenre) {
          filters = filters.concat({ genres: { $elemMatch: { $eq: queriedGenre } }})
        }
        if(queriedAuthor) {
          const author = await Author.findOne({name: queriedAuthor})
          const authorFilter = { author: author._id }
          filters = filters.concat(authorFilter)
        }

        if(filters.length !== 0) {
          return await Book.find({ $and: filters }).populate('author')
        }

        return await Book.find({}).populate('author')
      },
      allAuthors: () => Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }  
  },
  Author: {
      bookCount: async root => {
          console.log(root)
          const authorId = root._id
          const books = await Book.find({author: authorId})
          return books && books.length || 0
      }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try{
        console.log(args)

        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const authorName = args.author
        let author = await Author.findOne({name: authorName})

        if(!author)
        {
            const newAuthor = new Author({
                name: authorName
              })
  
            await newAuthor.save()
            author = newAuthor
            console.log('saved author!')
        }

        const book = new Book({ ... args, author })
        
        await book.save()
        console.log('saved book!')
        return book
      }
      catch(error) {
        console.log(error)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }    
    },
    editAuthor: async (root, args, context) => {
        const authorName = args.name
        const newBornDate = args.setBornTo

        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        try{
          const authorToModify = await Author.findOneAndUpdate({ name: authorName}, { $set: { born: newBornDate } }, { returnOriginal: false})

          if(!authorToModify)
              return null
  
          return authorToModify
        }
        catch(error) {
          console.log(error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        } 
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    }, 
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }  
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})