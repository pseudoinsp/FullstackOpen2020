import React from 'react';
import { Course } from '../types/Course';

const Content: React.FC<{ courseParts: Array<Course> }> = ({ courseParts }) => (
    <>
        <p>
            {courseParts[0].name} {courseParts[0].exerciseCount}
        </p>
        <p>
            {courseParts[1].name} {courseParts[1].exerciseCount}
        </p>
        <p>
            {courseParts[2].name} {courseParts[2].exerciseCount}
        </p>
    </>
  );

export default Content;