import React from 'react';

export default function({ name, number, onDelete }) {
    // eslint-disable-next-line no-restricted-globals
    return <p>{name} -- {number} <button onClick={() => confirm(`Delete ${name}?`) && onDelete()}>Delete</button></p>
}
