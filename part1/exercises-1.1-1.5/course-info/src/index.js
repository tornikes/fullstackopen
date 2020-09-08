import React from 'react'
import ReactDOM from 'react-dom'


function Header({ course }) {
    return (
        <h1>{course}</h1>
    );
}

function Part({ partName, number }) {
    return (
        <p>{partName} {number}</p>
    );
}

function Content({ parts }) {
    return (
        <div>
            <Part partName={parts[0].name} number={parts[0].number} />
            <Part partName={parts[1].name} number={parts[1].number} />
            <Part partName={parts[2].name} number={parts[2].number} />
        </div>
    );
}

function Total({ counts }) {
    return <p>Number of exercises {counts.reduce((a, b) => a + b)}</p>
}

const App = () => {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;

    const parts = [
        {
            name: part1,
            number :exercises1
        },
        {
            name: part2,
            number :exercises3
        },
        {
            name: part3,
            number :exercises3
        },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total counts={[exercises1, exercises2, exercises3]} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
