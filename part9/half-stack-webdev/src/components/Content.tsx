import React from 'react';
import { CoursePart } from '..';
import Part from './Part';

interface ContentProps {
  contents: CoursePart[]
}

const Content: React.FC<ContentProps> = ({ contents }) => {
  return (
    <>
      {contents.map(item => <Part key={item.name} part={item} />)}
    </>
  );
}

export default Content;