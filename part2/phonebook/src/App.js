import React, { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import service from './service';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '202-230-230' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        service.fetchAll()
            .then(data => setPersons(data));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const p = persons.find(p => p.name === newName);
        if (!p) {
            service.addPerson({ name: newName, number: newNumber })
                .then(person => {
                    setPersons([...persons, person]);
                });
            setNewName('');
            setNewNumber('');
        } else {
            // eslint-disable-next-line no-restricted-globals
            if (confirm(`${name} is alreay added to the phonebook, replace the old number with a new one?`)) {
                const pers = { ...p, number: newNumber };                
                service.updatePerson(p.id, pers)
                    .then(data => {
                        setPersons(persons.map(pe => pe.id === p.id ? data : pe));
                    })
            }
        }
    }

    function handleDeletion(id) {
        service
            .deletePerson(id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== id));
            })
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
            <PersonList
                persons={applyFilter()}
                onDelete={handleDeletion}
            />
        </div>
    )
}

export default App
