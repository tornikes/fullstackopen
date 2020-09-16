import React from 'react';

export default function({ isError, message }) {
    return (
        <div className={isError ? 'error' : 'notify'}>
            <p>{message}</p>
        </div>
    );
}