import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = useSelector(state => state.anecdotes)
    const anecdoteFilter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleVote = anecdote => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }  

    useEffect(() => {
        dispatch(initializeAnecdotes(anecdotes))
      }, [dispatch, anecdotes])

    return (
        <>
            {anecdotes
                .filter(x => x.content.toLowerCase().includes(anecdoteFilter.toLowerCase()))
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