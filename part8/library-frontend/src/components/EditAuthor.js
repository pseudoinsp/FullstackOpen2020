import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS, ALL_AUTHOR_NAMES, OVERWRITE_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import Select  from 'react-select'

const EditAuthor = (props) => {
    const [authorName, setAuthorName] = useState({})
    const [birthYear, setBirthYear] = useState('')
    const [options, setOptions] = useState([])

    useQuery(ALL_AUTHOR_NAMES, {
        onCompleted: data => {
          const authors = data.allAuthors
          const newOptions = authors.map(a => {
            return { label: a.name, value: a.name }
          })
          setOptions(newOptions)
    }})
  
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

        overwriteAuthor({ variables: { name: authorName.value, setBornTo: Number(birthYear) } })
  
        setAuthorName('')
        setBirthYear('')
    }

    return (
      <div>
        <form onSubmit={submit}>
          <div>
            name
            <Select options={options} 
                    value={authorName}
                    onChange={( selected ) => { console.log(selected); setAuthorName(selected)}} />
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