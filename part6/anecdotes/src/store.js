import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer';
import messageReducer from './reducers/messageReducer';
import filterReducer from './reducers/filterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    combineReducers({
        anecdotes: anecdoteReducer,
        message: messageReducer,
        filter: filterReducer
    }),
    composeWithDevTools()
);

export default store;