  
import React from 'react'
import { ALL_AUTHORS } from '../queries' 
import { useQuery} from '@apollo/client'

const Authors = (props) => {
  const authorsQueryResult = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if(authorsQueryResult.loading) {
    return <div>Loading...</div>
  }

  const authors = authorsQueryResult.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
