import React from 'react';
import { CoursePart } from '../types/Course';
import Part from './Part';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({ courseParts }) => (
    <>    
        {courseParts.map(x => <Part key={x.name} part={x} />)}
    </>
  );

export default Content;