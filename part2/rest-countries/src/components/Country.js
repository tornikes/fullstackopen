import React from 'react';


function Country({ name, population, languages, flag, capital }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Capital {capital}</p>
            <p>Population {population}</p>
            <h4>Languages</h4>
            <ul>
                {languages.map(lang => (
                    <li key={lang.name}>{lang.name}</li>
                ))}
            </ul>
            <img src={flag} alt={`flag of ${name}`} />
        </div>
    );
}

export default Country;
