import React from 'react'

const Filter = ({filterValue, changeHandler}) => {
    return (
        <div>
        <p>filter shown with <input value={filterValue} onChange={changeHandler} /> </p>
    </div>
    )
}

export default Filter