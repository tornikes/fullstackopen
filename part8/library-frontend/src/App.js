
import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient } from '@apollo/client';
import Recommendations from './components/Recommendations';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(localStorage.getItem('phonenumbers-user-token'));
    const [errorMessage, setErrorMessage] = useState(null);
    const client = useApolloClient();

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    };

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && <button onClick={() => setPage('add')}>add book</button>}
                {token && <button onClick={() => setPage('recom')}>recommend</button>}
                {!token && <button onClick={() => setPage('login')}>Log In</button>}
                {token && <button onClick={logout}>Log Out</button>}
            </div>

            <Authors
                show={page === 'authors'}
            />

            <Books
                show={page === 'books'}
            />

            <Recommendations
                show={page === 'recom'}
            />

            <NewBook
                show={page === 'add'}
            />

            <LoginForm
                show={page === 'login'}
                setToken={setToken}
                setError={notify}
            />

        </div>
    );
}

const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
        return null
    }
    return (
        <div style={{ color: 'red' }}>
            {errorMessage}
        </div>
    )
}


export default App;