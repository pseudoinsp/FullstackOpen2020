import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) =>
{
  return (
    <p>{props.name} {props.value}</p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => 
          <Part key={part.name} name={part.name} value={part.exercises} />
        )}
    </>
    )
  }

  const Total = (props) => {
    return (
        <>
          <p>Number of exercises {props.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)}</p>

          {/* this doesnt work */}
          {/* <p>Number of exercises {props.parts.reduce((a, b) => a.exercises + b.exercises, 0)}</p> */}
        </>
    )
  }

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))