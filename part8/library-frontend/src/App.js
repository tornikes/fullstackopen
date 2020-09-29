import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { gql, useApolloClient, useSubscription } from '@apollo/client';
import Recommendations from './components/Recommendations';
import { ALL_BOOKS } from './components/Books'

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            published
            author {
                name
            }
        }
    }
`;

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

    function updateCacheWith(addedBook) {
        const includedIn = (set, object) =>
            set.map(p => p.id).includes(object.id);

        const dataInStore = client.readQuery({ query: ALL_BOOKS });
        if(!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) }
            })
        }
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;
            notify(`${addedBook.title} added`);
            updateCacheWith(addedBook);
        }
    });

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