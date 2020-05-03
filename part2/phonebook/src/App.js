import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault();

    if(persons.map(p => p.name).includes(newName))
    {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    var newPerson = {
      name: newName
    };

    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {/* <p>{persons[0].name}</p> */}
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App