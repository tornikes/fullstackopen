import React from 'react';
import { connect } from 'react-redux';
import { createVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/messageReducer';

function AnecdoteList({ anecdotes, vote }) {
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

function mapStateToProps(state) {
    const anecdotes = [...state.anecdotes];
    anecdotes.sort((a, b) => b.votes - a.votes);
    if (state.filter) {
        const regex = new RegExp(state.filter, 'ig');
        return { anecdotes: anecdotes.filter(a => regex.test(a.content)) };
    }
    return { anecdotes };
}

function mapDispatchToProps(dispatch) {
    return {
        vote: (anecdote) => {
            dispatch(createVote(anecdote));
            dispatch(setNotification(`You voted for ${anecdote.id}`, 5));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);