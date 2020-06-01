import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonsService from './services/PersonsService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMessageColor, setNotificationColor] = useState('green')
  

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
                      .then(updatedPerson => {
                        notifyUser(`Successfully updated ${updatedPerson.name}`, 'green')
                        setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
                      })
                      .catch(error => notifyUser(`unsuccessful update: ${error}`, 'red'))
      }
      else {
        return;
      }
    }
    else {
      PersonsService.addPerson(newOrUpdatedPerson)
                    .then(createdPerson => {
                      console.log(createdPerson)
                      notifyUser(`Person successfully added`, 'green')
                      setPersons(persons.map(p => p.id !== createdPerson.id ? p : createdPerson))
                    })
                    .catch(error => notifyUser(`unsuccessful add: ${error}`, 'red'))
    }

    setNewName('');
    setNewNumber('');
  }

  const notifyUser = (message, color) => {
    setNotificationColor(color)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleDelete = event => {
      let idOfDeletedPerson = Number(event.target.id);

      if(window.confirm(`Delete ${persons.find(p => p.id === idOfDeletedPerson).name}?`)) {
        PersonsService.deletePerson(idOfDeletedPerson)
                      .then(() => {
                        notifyUser('Successful remove', 'green')
                        setPersons(persons.filter(p => p.id !== idOfDeletedPerson))
                      })
                      .catch(error => notifyUser(`unsuccessful delete: ${error}`, 'red'))
      }
  }

  useEffect(() => {
    PersonsService.getAll()
                .then(ps => setPersons(ps))
  }, [newName, nameFilter])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} color={notificationMessageColor} />
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