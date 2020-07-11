import React, { useState } from 'react'
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK, ALL_BOOKS_WITH_GENRE } from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const generateRefetches = () => {
    let refetches = [{ query: ALL_BOOKS, ALL_AUTHORS }]

    const genreRefetches = genres.map(genre => {
      return { query: ALL_BOOKS_WITH_GENRE, variables: { genre } }
    })

    refetches = refetches.concat(genreRefetches)
    return refetches;
  }
  

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: generateRefetches(),
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createBook({
      variables: { title, author, published: Number(published), genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook