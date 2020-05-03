import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault();

    if(persons.map(p => p.name).includes(newName))
    {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    let newPerson = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filterValue={nameFilter} changeHandler={event => setNameFilter(event.target.value)} />
      </div>

      <h2>Add a new</h2>
        <PersonForm name={newName} nameChangeHandler={event => setNewName(event.target.value)}
                    number={newNumber} numberChangeHandler={event => setNewNumber(event.target.value)}
                    submitHandler={addName}
                    />
      <h2>Numbers</h2>
          <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App