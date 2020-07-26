import React from "react";
import Header from "./components/Header";
import Total from "./components/Total";
import Content from "./components/Content";
import { Course } from './types/Course';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const typedParts = courseParts as Array<Course>

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={typedParts} />
      <Total courseParts={typedParts} />
    </div>
  );
};

export default App;