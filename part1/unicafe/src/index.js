import React, { useState } from 'react'
import ReactDOM from 'react-dom'


function Statistics({ good, neutral, bad }) {
    if (good + neutral + bad) {
        return (
            <>
                <h2>Statistics</h2>
                <table>
                    <thead />
                    <tbody>
                        <Statistic msg={"Good"} quantity={good} />
                        <Statistic msg={"Neutral"} quantity={neutral} />
                        <Statistic msg={"Bad"} quantity={bad} />
                        <Statistic msg={"All"} quantity={good + neutral + bad} />
                        <Statistic msg={"Average"} quantity={(good - bad * -1) / (good + neutral + bad) || 0} postfix={'%'} />
                        <Statistic msg={"Positive"} quantity={good / (neutral + bad) || 0} postfix={'%'} />
                    </tbody>
                </table>
            </>
        );
    } else {
        return null;
    }
}

function Button({ text, handleClick }) {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    );
}

function Statistic({ msg, quantity, postfix = '' }) {
    return (
        <tr>
            <td>{msg}</td>
            <td>{quantity}{postfix}</td>
        </tr>
    );
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text="Good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="Bad" />
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
