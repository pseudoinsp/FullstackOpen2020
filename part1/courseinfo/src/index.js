import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) =>
{
  console.log(props.name);
  console.log(props.value);


  return (
    <p>{props.name} {props.value}</p>
  )
}

const Content = (props) => {
  console.log(props.parts);
  console.log(Object.entries(props.parts));

  return (
    <>
      {Object.entries(props.parts).map((part) => 
          <Part id={part[0]} name={part[0]} value={part[1]} />
        )}
    </>
    )
  }

  const Total = (props) => {
    return (
        <>
          <p>Number of exercises {Object.values(props.parts).reduce((a, b) => a + b, 0)}</p>
        </>
    )
  }

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const partsDictionary = {
    part1: exercises1,
    part2: exercises2,
    part3: exercises3
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={partsDictionary} />
      <Total parts={partsDictionary} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))