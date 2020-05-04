import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './services/PersonsService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault();

    let newOrUpdatedPerson = {
      name: newName,
      number: newNumber
    };

    if(persons.map(p => p.name).includes(newName))
    {
      let alreadyAddedPerson = persons.find(p => p.name === newName)

      if(window.confirm(`${alreadyAddedPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        PersonsService.updatePerson(alreadyAddedPerson.id, newOrUpdatedPerson)
                      .then(updatedPerson => setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson)))
      }
      else {
        return;
      }
    }
    else {
      PersonsService.addPerson(newOrUpdatedPerson)
                    .then(createdPerson => setPersons(persons.map(p => p.id !== createdPerson.id ? p : createdPerson)))
    }

    setNewName('');
    setNewNumber('');
  }

  const handleDelete = event => {
      let idOfDeletedPerson = Number(event.target.id);

      if(window.confirm(`Delete ${persons.find(p => p.id === idOfDeletedPerson).name}?`)) {
        PersonsService.deletePerson(idOfDeletedPerson)
                      .then(setPersons(persons.filter(p => p.id !== idOfDeletedPerson)))
                      .catch(error => alert(`unsuccessful delete: ${error}`))
      }
  }

  useEffect(() => {
    PersonsService.getAll()
                .then(persons => setPersons(persons))
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
          <Persons persons={persons} nameFilter={nameFilter} deleteButtonHandler={handleDelete} />
    </div>
  )
}

export default App