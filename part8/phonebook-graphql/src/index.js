const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

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
        author: String!
        id: ID!
        genres: [String!]! 
    }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
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
          return await Book.find({ $and: filters })
        }

        return await Book.find({})
      },
      allAuthors: () => Author.find({})
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
    addBook: async (root, args) => {
      try{
        console.log(args)
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

        const book = new Book({ ... args, author: author._id })
        
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
    editAuthor: async (root, args) => {
        const authorName = args.name
        const newBornDate = args.setBornTo

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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})