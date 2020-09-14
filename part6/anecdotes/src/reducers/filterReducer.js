export default function filterReducer(state = '', action) {
    switch(action.type) {
        case 'SET_FILTER': return action.data.filter
        default: return state;
    }
}