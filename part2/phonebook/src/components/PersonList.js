import React from 'react';
import Person from './Person';

export default function({ persons, onDelete }) {
    return (
        <div>
            {persons.map(person => (
                <Person key={person.name} {...person} onDelete={() => onDelete(person.id)} />
            ))}
        </div>
    );
}
