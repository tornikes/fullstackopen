import React from 'react';

export default function LoginForm({ username, password, handleUsername, handlePassword, handleLogin }) {
    return (
        <form onSubmit={handleLogin}>
            <h1>Log in to application</h1>
            <div>
                username
                <input id="username" type="text" value={username} onChange={(e) => handleUsername(e.target.value)} />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => handlePassword(e.target.value)}
                />
            </div>
            <button id="login-button" type="submit">Submit</button>
        </form>
    );
}
