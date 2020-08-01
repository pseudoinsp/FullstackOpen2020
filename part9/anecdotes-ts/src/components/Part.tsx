import React from 'react';
import { CoursePart } from '../types/Course';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch(part.name) {
        case "Fundamentals":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.description}
                </p>
            )
        case "Using props to pass data":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.groupProjectCount}
                </p>
            )
        case "Deeper type usage":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
                </p>
            )
        case "State handling":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.description} {part.description}
                </p>
            )
        default:
            return assertNever(part);
    }
}

export default Part;