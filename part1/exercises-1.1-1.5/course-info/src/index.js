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
            <Part partName={parts[0].name} number={parts[0].exercises} />
            <Part partName={parts[1].name} number={parts[1].exercises} />
            <Part partName={parts[2].name} number={parts[2].exercises} />
        </div>
    );
}

function Total({ parts }) {
    return <p>Number of exercises {parts.map(p => p.exercises).reduce((a, b) => a + b)}</p>
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
