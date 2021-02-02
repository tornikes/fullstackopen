import React from 'react';
import { CoursePart } from '../index';

function assertNever(val: never): never  {
  throw new Error(`Unhandled discriminated union type ${JSON.stringify(val)}`);
}

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch(part.name) {
    case 'Fundamentals': return (
      <p>{part.name} {part.description} {part.exerciseCount}</p>
    );
    case 'Using props to pass data': return (
      <p>
        {part.name} {part.exerciseCount}, 
        Projects: {part.groupProjectCount}
      </p>
    );
    case 'Deeper type usage': return (
      <p>
        {part.name} {part.description}, 
        {part.exerciseCount}, {part.exerciseSubmissionLink}</p>
    );
    default: assertNever(part);
  }

  return <h1>H</h1>
}

export default Part;