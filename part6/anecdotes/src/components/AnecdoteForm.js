import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';

function AnecdoteForm({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: async function(e) {
            e.preventDefault();
            const contents = e.target.anecdote.value;
            e.target.anecdote.value = '';
            dispatch(createAnecdote(contents));
        }
    }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);