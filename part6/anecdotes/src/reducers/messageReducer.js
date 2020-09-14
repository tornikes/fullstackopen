const initialState = 'Welcome To Our Anecdotes Website!';

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_MESSAGE': return action.data.message;
        default: return state;
    }
}

export function createVoteMessage(id) {
    return {
        type: 'SET_MESSAGE',
        data: { message: `You voted for ${id}` }
    }
}

export function resetMessage() {
    return {
        type: 'SET_MESSAGE',
        data: { message: initialState }
    }
}

export function createdAnecdoteMessage(contents) {
    return {
        type: 'SET_MESSAGE',
        data: { message: `You created new anecdote: ${contents}` }
    }
}