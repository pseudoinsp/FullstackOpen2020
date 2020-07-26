import React from 'react';
import { Course } from '../types/Course';

const Total: React.FC<{ courseParts: Array<Course> }> = ({ courseParts }) => (
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  );

export default Total;