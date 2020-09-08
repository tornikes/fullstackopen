import React, { useState } from 'react'
import SearchFilter from './components/SearchFilter';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '202-230-230' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterText, setFilterText] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (persons.findIndex(p => p.name === newName) === -1) {
            setPersons([...persons, { name: newName, number: newNumber }]);
            setNewName('');
            setNewNumber('');
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    }

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleNumber(e) {
        setNewNumber(e.target.value);
    }

    function handleFilterChange(e) {
        setFilterText(e.target.value);
    }

    function applyFilter() {
        if (filterText.length) {
            const regex = new RegExp(filterText, 'i');
            return persons.filter(p => regex.test(p.name));
        } else {
            return persons;
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <SearchFilter filterText={filterText} handleFilterChange={handleFilterChange} />
            <PersonForm 
                newName={newName}
                handleChange={handleChange}
                newNumber={newNumber}
                handleNumber={handleNumber}
                handleSubmit={handleSubmit}
            />
            <h2>Numbers</h2>
            <PersonList persons={applyFilter()} />
        </div>
    )
}

export default App
