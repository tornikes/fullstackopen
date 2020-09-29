import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

export const ALL_BOOKS = gql`
    query {
        allBooks {
            id
            title
            published
            author {
                name
            }
            genres
        }
    }
`;

const Books = (props) => {    
    const result = useQuery(ALL_BOOKS);
    const [filter, setFilter] = useState('');

    if (!props.show) {
        return null
    }
    if(result.loading) {
        return null;
    }

    function applyFilter(books, genre) {
        if(!genre) return books;
        return books.filter(book => book.genres.includes(genre));
    }

    function allGenres(books) {
        const gnrs = Array.from(new Set(books.flatMap(book => book.genres)));
        return gnrs;
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
            </th>
                        <th>
                            published
            </th>
                    </tr>
                    {applyFilter(result.data.allBooks, filter).map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <PickGenre
                genres={allGenres(result.data.allBooks)}
                setGenre={setFilter}
            />
        </div>
    )
}

function PickGenre({ genres, setGenre }) {
    return (
        <div>
            {genres.map(genre => (
                <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>
            ))}
            <button onClick={() => setGenre('')}>All Genres</button>
        </div>
    );
}

export default Books