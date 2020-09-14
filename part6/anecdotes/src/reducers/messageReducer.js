const initialState = 'Welcome To Our Anecdotes Website!';

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MESSAGE': return action.data.message;
        default: return state;
    }
}

export function setNotification(message, time = 1) {
    return async function (dispatch) {
        dispatch({
            type: 'SET_MESSAGE',
            data: { message }
        });
        setTimeout(() => {
            dispatch(resetMessage())
        }, time * 1000);
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