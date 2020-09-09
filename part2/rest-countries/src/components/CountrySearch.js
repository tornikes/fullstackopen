import React from 'react';

function CountrySearch({ searchTerm, handleChange }) {
    return (
        <p>
            <input type="text" value={searchTerm} onChange={handleChange} />
        </p>
    );
}

export default CountrySearch;