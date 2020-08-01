import React from 'react';
import { CoursePart } from '../types/Course';

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  );

export default Total;