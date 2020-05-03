import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: 3501893247293  
    }
  ]) 
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

    var newPerson = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with <input value={nameFilter} onChange={event => setNameFilter(event.target.value)} /> </p>
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
          {persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
                  .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App