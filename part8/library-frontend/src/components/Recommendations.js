import React, { useEffect } from 'react'
import { ALL_BOOKS_WITH_GENRE, FAVORITE_GENRE } from '../queries' 
import { useQuery, useLazyQuery } from '@apollo/client'

const Recommendations = ( {show} ) => {

  const favGenreResult = useQuery(FAVORITE_GENRE)
  const [ booksQuery, booksResult ] = useLazyQuery(ALL_BOOKS_WITH_GENRE) 

  useEffect(() => {
    if(!favGenreResult.data) return

    booksQuery({variables: { genre: favGenreResult.data.me.favoriteGenre }})
    // eslint-disable-next-line
  }, [favGenreResult.data]) 

  if (!show) {
    return null
  }

  if(favGenreResult?.loading || booksQuery?.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>

      {<p>books in your favorite genre <b>{favGenreResult.data.me.favoriteGenre}</b></p>}

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
          {booksResult.data.allBooks.map(a =>
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

export default Recommendations