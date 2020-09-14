import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createVote } from '../reducers/anecdoteReducer';

export default function AnecdoteList() {
    const anecdotes = useSelector(state => {
        const anecdotes = [...state];
        anecdotes.sort((a, b) => b.votes - a.votes);
        return anecdotes;
    });
    const dispatch = useDispatch();
    const vote = (id) => {
        dispatch(createVote(id));
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
}