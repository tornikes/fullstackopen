import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { createdAnecdoteMessage, resetMessage } from '../reducers/messageReducer';

export default function AnecdoteForm() {
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const contents = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(createAnecdote(contents));
        dispatch(createdAnecdoteMessage(contents));
        setTimeout(() => dispatch(resetMessage()), 5000);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
    );
}