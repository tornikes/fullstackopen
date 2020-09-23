import React from 'react'
import { useQuery, gql } from '@apollo/client'

export const FAVES = gql`
    query {
        favorites {
            title
            published
            author {
                name
            }
            genres
        }
    }
`;

const Recommendations = (props) => {
    const result = useQuery(FAVES);

    if (!props.show) {
        return null
    }
    if (result.loading) {
        return null;
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
                    {result.data.favorites.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations