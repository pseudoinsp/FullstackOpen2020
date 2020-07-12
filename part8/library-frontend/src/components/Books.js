import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, ALL_GENRES, ALL_BOOKS_WITH_GENRE, BOOK_ADDED } from '../queries' 
import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'

const Books = (props) => {
  // order is important here, if ALL_GENRES would come later, the cache would contain only genres info about books
  const genresQueryResult = useQuery(ALL_GENRES)
  const booksQueryResult = useQuery(ALL_BOOKS)
  const [ bookByGenres, bookByGenreResult ] = useLazyQuery(ALL_BOOKS_WITH_GENRE)
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if(!booksQueryResult?.data) return
    setBooks(booksQueryResult.data.allBooks)
    // eslint-disable-next-line
  }, [booksQueryResult.data]) 

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.title).includes(object.title)  

    const updateBookCache = (queryName, genre, book) => {
      // readQuery API will throw an error if the cache does not exist
      try {
      const dataInStore = genre ? client.readQuery({ query: queryName, variables: { genre } }) : client.readQuery({ query: queryName })

      if (!includedIn(dataInStore.allBooks, book)) {
        client.writeQuery({
          query: queryName,
          variables: genre ?  { genre } : null,
          data: { allBooks : dataInStore.allBooks.concat(book) }
        })
      }
      }
      catch(e) {
        console.log(e)
      }
    }  

    updateBookCache(ALL_BOOKS, null, addedBook)
    addedBook.genres.forEach(genre => updateBookCache(ALL_BOOKS_WITH_GENRE, genre, addedBook))
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // easy solution
      // client.reFetchObservableQueries(true)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

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