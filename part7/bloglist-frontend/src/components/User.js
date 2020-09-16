import React, { useEffect, useState } from 'react';
import userService from '../services/users';

export default function User({ match }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        userService.getOne(match.params.id)
            .then(d => setData(d));
    }, []);

    if(!data) {
        return null;
    }
    return (
        <div>
            <h2>{data.name}</h2>
            <h4>Added blogs</h4>
            <ul>
                {data.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
}