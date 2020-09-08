import React from 'react';
import Person from './Person';

export default function({ persons }) {
    return (
        <div>
            {persons.map(person => (
                <Person key={person.name} {...person} />
            ))}
        </div>
    );
}
