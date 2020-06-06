import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ numbers }) => {
    const sum = numbers.reduce((sum, number) => sum + number, 0);
    return(
      <p>total of {sum} exercises</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(coursePart => 
                            <Part key={coursePart.id} part={coursePart} />
                         )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <b>
          <Total numbers={course.parts.map(coursePart => coursePart.exercises)} />
        </b>
      </>
    )
  }

  export default Course