import { setNotification } from '../reducers/messageReducer';
import anecdoteservice from '../anecdoteservice';

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE': return state.map(anecdote => anecdote.id === action.data.anecdote.id ? action.data.anecdote : anecdote);
        case 'ANECDOTES_FETCHED': return action.data;
        case 'NEW_ANECDOTE': return [...state, action.data.anecdote];
        default: return state;
    }
}

export function createVote(anecdote) {
    return async function (dispatch) {
        const nextAnecdote = await anecdoteservice.vote({ ...anecdote, votes: anecdote.votes + 1 });
        dispatch({
            type: 'VOTE',
            data: { anecdote: nextAnecdote }
        });
    }
}

export function createAnecdote(anecdote) {
    return async function (dispatch) {
        const nextAnecdote = await anecdoteservice.createAnecdote(anecdote);
        dispatch({
            type: 'NEW_ANECDOTE',
            data: { anecdote: nextAnecdote }
        });
        dispatch(setNotification(`You created a new anecdote: ${nextAnecdote.content}`, 5));
    }
}

export function initializeAnecdotes() {
    return async function (dispatch) {
        const anecdotes = await anecdoteservice.fetchAll();
        dispatch({
            type: 'ANECDOTES_FETCHED',
            data: anecdotes
        });
    }
}

export default reducer;