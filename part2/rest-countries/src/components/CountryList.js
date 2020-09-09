import React from 'react';

function CountryList({ countries, handleClick }) {
    return (
        <div>
            {countries.map((c, i) => (
                <p key={c.name}>
                    {c.name}
                    <button onClick={() => handleClick(i)}>Show</button>
                </p>
            ))}
        </div>
    );
}

export default CountryList;