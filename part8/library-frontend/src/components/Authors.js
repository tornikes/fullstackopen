
import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
      allAuthors {
          name
          born
          bookCount
      }
  }
`;

const SET_YEAR = gql`
  mutation setAuthorBirthYear($name: String! $year: Int!) {
      editAuthor(
          name: $name
          setBornTo: $year
      ) {
          name
          born
          bookCount
      }
  }
`;

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS);
    const [setYear] = useMutation(SET_YEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    });

    const [name, setName] = useState('');
    const [birthYear, setBirthYear] = useState('');

    useEffect(() => {
        if(!result.loading) setName(result.data.allAuthors[0].name);
    }, [result])

    function handleBirthYear(e) {
        e.preventDefault();
        if (name && birthYear) {
            setYear({
                variables: {
                    name,
                    year: parseInt(birthYear)
                }
            });
            setBirthYear('');
        }
    }

    if (!props.show) {
        return null
    }
    if (result.loading) {
        return null;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
            </th>
                        <th>
                            books
            </th>
                    </tr>
                    {result.data.allAuthors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <form onSubmit={handleBirthYear}>
                <h3>Set birth year</h3>
                name:
                <select value={name} onChange={e => setName(e.target.value)}>
                    {result.data.allAuthors.map(a => (
                        <option key={a.name} value={a.name}>{a.name}</option>
                    ))}
                </select>
                <br />
                birthyear:
                <input
                    type="number"
                    value={birthYear}
                    onChange={({ target }) => setBirthYear(target.value)}
                />
                <br />
                <button type="submit">Update Author</button>
            </form>
        </div>
    )
}

export default Authors
