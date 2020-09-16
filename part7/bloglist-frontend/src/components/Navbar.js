import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, handleLogout }) {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Blogs</Link></li>
                <li><Link to='/users'>Users</Link></li>
            </ul>
                {user &&
                    <>
                        <div>Hello, {user.name}
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </>
                }
        </nav>
    );
}