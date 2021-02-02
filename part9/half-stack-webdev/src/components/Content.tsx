import React from 'react';

interface ContentProps {
  contents: Array<{ name: string, exerciseCount: number}>
}

const Content: React.FC<ContentProps> = ({ contents }) => {
  return (
    <>
      {contents.map(item => <p key={item.name}>{item.name} {item.exerciseCount}</p>)}
    </>
  );
}

export default Content;