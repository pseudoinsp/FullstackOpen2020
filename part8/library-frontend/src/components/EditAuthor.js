import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS, OVERWRITE_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const EditAuthor = (props) => {
    const [authorName, setAuthorName] = useState('')
    const [birthYear, setBirthYear] = useState('')
  
    const [ overwriteAuthor, result ] = useMutation(OVERWRITE_AUTHOR, {
      refetchQueries: [  {query: ALL_AUTHORS} ],
      onError: (error) => {
        console.log(JSON.stringify(error, null, 2));
      },
    })

    useEffect(() => {
      if ( result.data && !result.data.editAuthor) {
        console.log('name not found')
      }
    }, [result.data]) // eslint-disable-line
  
    if (!props.show) {
      return null
    }
  
    const submit = async (event) => {
        event.preventDefault()

        overwriteAuthor({ variables: { name: authorName, setBornTo: Number(birthYear) } })
  
        setAuthorName('')
        setBirthYear('')
    }
  
    return (
      <div>
        <form onSubmit={submit}>
          <div>
            name
            <input
              value={authorName}
              onChange={({ target }) => setAuthorName(target.value)}
            />
          </div>
          <div>
            born
            <input
              type='number'
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }
  
  export default EditAuthor