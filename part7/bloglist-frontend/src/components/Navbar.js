import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.1rem;
    padding: 0.3em 1.2em;
    color: white;
    background-color: transparent;
    border: 3px solid white;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: palevioletred;
    }
`;

const DIV = styled.div`
    display: flex;
    align-items: center;
`;

const Nav = styled.nav`
    padding: 0.3em 2em;
`;

const P = styled.p`
    color: white;
    font-weight: bold;
    font-style: italic;
    font-family: Arial;
`;

const NavLink = styled(Link)`
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: none;
    font-family: Arial;
    padding: 0.3rem 0.3rem;

    &:hover {
        border-bottom: 2px solid white;
    }
`;

export default function Navbar({ user, handleLogout }) {
    return (
        <Nav>
            <ul>
                <li><NavLink to='/'>Blogs</NavLink></li>
                <li><NavLink to='/users'>Users</NavLink></li>
            </ul>
                {user &&
                    <>
                        <DIV><P>Hello, {user.name}</P>
                            <Button onClick={handleLogout}>Logout</Button>
                        </DIV>
                    </>
                }
        </Nav>
    );
}