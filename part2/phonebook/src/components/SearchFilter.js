import React from 'react';

export default function({ filterText, handleFilterChange }) {
    return (
        <p>
            filter shown with <input type="text" value={filterText} onChange={handleFilterChange} />
        </p>
    );
}
