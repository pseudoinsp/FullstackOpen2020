import React from 'react'

const Persons = ({persons, nameFilter}) => {
    return (
        <>
            {persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
                    .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons