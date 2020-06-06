import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const getRandomIntInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const SelectRandomAnecdote = () => {
    let nextAnecdoteIndex = getRandomIntInRange(0, props.anecdotes.length - 1);
    console.log(nextAnecdoteIndex);
    setSelected(nextAnecdoteIndex);
  }

  const VoteCurrentAnecdote = () => {
    const votesCopy = {...votes};
    votesCopy[selected] +=1;

    // have to hard cast to array, otherwise votes will be an object on which indexof cannot be called
    setVotes(Object.values(votesCopy));
  }

  const HighestVotedIndex = () => {
     let indexOfHighestVote = votes.indexOf(Math.max.apply(null, votes));
    return indexOfHighestVote;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <button onClick={() =>VoteCurrentAnecdote()}>vote</button>
      <button onClick={() =>SelectRandomAnecdote()}>next anecdote</button>
    
      <h2>Anecdote with the most votes</h2>  
      {props.anecdotes[HighestVotedIndex()]} <br/>
      has {votes[HighestVotedIndex()]} votes
     </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)