import React from 'react'
import { ALL_BOOKS } from '../queries' 
import { useQuery} from '@apollo/client'

const Books = (props) => {
  const booksQueryResult = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if(booksQueryResult.loading) {
    return <div>Loading...</div>
  }

  const books = booksQueryResult.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books