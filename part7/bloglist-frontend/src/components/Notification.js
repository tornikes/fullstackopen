import React from 'react';
import styled from 'styled-components';

const Notif = styled.div`
    background-color: lightgreen;
    padding: 1em;
`;

export default function({ isError, message }) {
    return (
        <Notif className={isError ? 'error' : 'notify'}>
            <p>{message}</p>
        </Notif>
    );
}