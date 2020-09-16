import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blogReducer from './blogReducer';
import notificationReducer from './notificationReducer';
import getUserReducer from './userReducer';
import blogService from '../services/blogs';
import userReducer from './userReducer';


export function loadState() {
    try {
        const serialized = localStorage.getItem('state');
        if (serialized === null) {
            return;
        }
        const state = JSON.parse(serialized);
        if (state.user) {
            blogService.setToken(state.user.token);
        }
        return state;
    } catch (err) {
        return;
    }
}

export function saveState(state) {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem('state', serialized);
    } catch (err) {

    }
}

const preloadedState = loadState();
const store = createStore(
    combineReducers({
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer
    }), preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveState(store.getState());
});

if (window.Cypress) {
    window.store = store
}

export default store;