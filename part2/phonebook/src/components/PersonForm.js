import React from 'react';

export default function({ newName, handleChange, newNumber, handleNumber, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new</h2>
            <div>
                name: <input value={newName} onChange={handleChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}
