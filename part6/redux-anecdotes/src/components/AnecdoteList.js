import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { vote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({anecdotes, filter, initializeAnecdotes, setNotification, vote}) => {

    const handleVote = anecdote => {
        vote(anecdote)
        setNotification(`You voted '${anecdote.content}'`, 5)
    }  

    useEffect(() => {
        initializeAnecdotes()
      }, [initializeAnecdotes])

    return (
        <>
            {anecdotes
                .filter(x => x.content.toLowerCase().includes(filter.toLowerCase()))
                .sort((x, y) => y.votes - x.votes)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button  onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
    }
}

const mapDispatchToProps = {
    initializeAnecdotes,
    setNotification,
    vote
  }

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps)
    (AnecdoteList)

export default ConnectedAnecdoteList