import React from 'react';

function Header({ course }) {
    return (
        <h1>{course}</h1>
    );
}

function Part({ name, exercises }) {
    return (
        <p>{name} {exercises}</p>
    );
}

function Content({ parts }) {
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} {...part} />
            ))}
        </div>
    );
}

function Total({ parts }) {
    return <p style={{ fontWeight: 'bold' }}>total of {parts.reduce((acc, { exercises }) => acc + exercises, 0)} exercises</p>
}

export default function Course({ name, parts }) {
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </>
    );
}