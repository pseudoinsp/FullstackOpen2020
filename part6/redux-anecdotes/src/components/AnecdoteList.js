import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const handleVote = anecdote => {
        dispatch(vote(anecdote.id))
        notifyUser(`You voted '${anecdote.content}'`)
    }  

    const notifyUser = (message) => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <>
            {anecdotes
                .sort((x, y) => y.votes - x.votes)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList