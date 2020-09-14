import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/messageReducer';

export default function AnecdoteList() {
    const anecdotes = useSelector(state => {
        const anecdotes = [...state.anecdotes];
        anecdotes.sort((a, b) => b.votes - a.votes);
        if(state.filter) {
            const regex = new RegExp(state.filter, 'ig');
            return anecdotes.filter(a => regex.test(a.content));
        }
        return anecdotes;
    });
    const dispatch = useDispatch();
    const vote = (anecdote) => {
        dispatch(createVote(anecdote));
        dispatch(setNotification(`You voted for ${anecdote.id}`, 5));
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
}