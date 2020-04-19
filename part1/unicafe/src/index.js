import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({name, value}) => {
  return (
    <>
      <td>{name}</td>
      <td>{value}</td>
      {/* {name}: {value} <br/> */}
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const AllRatings = () => good + neutral + bad;

  const AverageRatings = () => {
    let all = AllRatings();
    return (good + bad*(-1)) / all;
  }

  const PositiveRatingsPercentage = () => {
    let all = AllRatings();
    return good / all * 100;
  }

  if(AllRatings() === 0) {
    return (
      <>
        No feedback given.
      </>
    )
  }

  return (
    <>
        <table>
          <tbody>
            <tr>
              <Statistic name='good' value={good} />
            </tr>
            <tr>
              <Statistic name='neutral' value={neutral} />
            </tr>
            <tr>
              <Statistic name='bad' value={bad} />
            </tr>
            <tr>
              <Statistic name='average' value={AverageRatings()} />
            </tr>
            <tr>
              <Statistic name='positive' value={PositiveRatingsPercentage() + ' %'} />
            </tr>
          </tbody>
        </table>
    </>
  )
}

const Button = ({text, onClick}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const AddGoodRating = () => setGood(good + 1);
  const AddNeutralRating = () => setNeutral(neutral + 1)
  const AddBadRating = () => setBad(bad + 1)

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button text='good' onClick={AddGoodRating} />
        <Button text='neutral' onClick={AddNeutralRating} />
        <Button text='bad' onClick={AddBadRating} />
      </div>

      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)