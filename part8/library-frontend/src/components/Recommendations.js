import React, { useEffect } from 'react'
import { ALL_BOOKS_WITH_GENRE, FAVORITE_GENRE } from '../queries' 
import { useQuery, useLazyQuery } from '@apollo/client'

const Recommendations = ( {show} ) => {

  const favGenreResult = useQuery(FAVORITE_GENRE, { pollInterval: 300 })
  const [ booksQuery, booksResult ] = useLazyQuery(ALL_BOOKS_WITH_GENRE) 

  useEffect(() => {
    if(!favGenreResult.data?.me?.favoriteGenre) return

    // TODO refetch query after successful login - currently the page is empty
    // this only solves the problem when there is no user initially - logout -> login still causes empty page
    // less hacky solution: subscribe to /me query changes, react on that
    favGenreResult.stopPolling()

    booksQuery({variables: { genre: favGenreResult.data.me.favoriteGenre }})
    // eslint-disable-next-line
  }, [favGenreResult.data]) 
 
  if (!show || !favGenreResult.data?.me?.favoriteGenre) {
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