import React, { useState, useEffect } from 'react';
import userService from '../services/users';
import { Link } from 'react-router-dom';

export default function Users() {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const d = await userService.getAll();
            setData(d);
        })();
    }, []);
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <td />
                        <td>blogs created</td>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}