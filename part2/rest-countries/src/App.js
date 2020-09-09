import React, { useState } from 'react';
import axios from 'axios';
import CountrySearch from './components/CountrySearch';
import Country from './components/Country';
import CountryList from './components/CountryList';

function App() {
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [showing, setShowing] = useState(-1);

    function handleChange(e) {
        setSearch(e.target.value);
        setShowing(-1);
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                const regex = new RegExp(search, 'i');
                const countries = res.data.filter(c => regex.test(c.name));
                setCountries(countries);
            });
    }
    
    return (
        <div>
            <CountrySearch
                searchTerm={search}
                handleChange={handleChange}
            />
            {countries.length === 1 
                ? <Country {...countries[0]} />
                : countries.length > 1
                ? (showing === -1 ? <CountryList countries={countries} handleClick={setShowing} /> : <Country {...countries[showing]} />)
                : <p>Nothing Found</p>
            }
        </div>
    );
}

export default App;
