export default function notificationReducer(state = '', action) {
    switch(action.type) {
        case 'SET_MESSAGE': return action.data.message;
        case 'RESET': return '';
        default: return state;
    }
}

export function setNotification(msg) {
    return function(dispatch) {
        dispatch(setMessage(msg));
        setTimeout(() => {
            dispatch(resetNotification());
        }, 5000);
    }
}

export function setMessage(message) {
    return {
        type: 'SET_MESSAGE',
        data: { message }
    }
}

export function resetNotification() {
    return {
        type: 'RESET'
    }
}