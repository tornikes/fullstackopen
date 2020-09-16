import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    width: 400px;
    margin: 0 auto;
`;

const Input = styled.input`
    display: block;
    padding: 0.6em 0.3em;
    width: 100%;
    margin: 1em 0;
`;


const Button = styled.button`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.1rem;
    padding: 0.3em 1.2em;
    color: palevioletred;
    width: 100%;
    margin-top: 1em;
    background-color: transparent;
    border: 3px solid palevioletred;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: palevioletred;
        color: white;
    }
    &focus {
        outline: none;
    }
`;

export default function LoginForm({ username, password, handleUsername, handlePassword, handleLogin }) {
    return (
        <Form onSubmit={handleLogin}>
            <h1>Log in to application</h1>
            <div>
                username
                <Input id="username" type="text" value={username} onChange={(e) => handleUsername(e.target.value)} />
            </div>
            <div>
                password
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => handlePassword(e.target.value)}
                />
            </div>
            <Button id="login-button" type="submit">Submit</Button>
        </Form>
    );
}
