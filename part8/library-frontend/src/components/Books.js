import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_WITH_GENRE } from '../queries' 
import { useQuery, useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const booksQueryResult = useQuery(ALL_BOOKS, {
    onCompleted: data => {
      setBooks(data.allBooks)
    }
  })
  const genresQueryResult = useQuery(ALL_GENRES)
  const [ bookByGenres, bookByGenreResult ] = useLazyQuery(ALL_BOOKS_WITH_GENRE)
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  const handleGenreSelection = newlySelectedGenre => {
    setSelectedGenre(newlySelectedGenre)    
    bookByGenres({ variables: {genre: newlySelectedGenre }})
  }

  useEffect(() => {
    if (bookByGenreResult.data) {
      setBooks(bookByGenreResult.data.allBooks)
    }
  }, [bookByGenreResult.data])

  if (!props.show) {
    return null
  }

  if(booksQueryResult.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && <p>in genre <b>{selectedGenre}</b></p>}

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

      <div>
        {genresQueryResult &&
        // Set has no map
        [...new Set(genresQueryResult.data.allBooks.map(book => book.genres).flat())]
        .map(genre => 
          <button value={genre} onClick={(event) => handleGenreSelection(event.target.value)} key={genre}>
            {genre}
          </button>)}
      </div>
    </div>
  )
}

export default Books