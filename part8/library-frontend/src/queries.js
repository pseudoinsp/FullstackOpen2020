import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
  `

  export const ALL_AUTHOR_NAMES = gql`
  query {
      allAuthors  {
        name
      }
    }
  `

  export const ALL_BOOKS = gql`
  query {
      allBooks  {
        title,
        published,
        author {
          name
        }
      }
    }
    `

export const CREATE_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
    }
}
`

export const OVERWRITE_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name
        setBornTo: $setBornTo,
    ) {
        name,
        born
    }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`