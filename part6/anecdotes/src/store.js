import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer';
import messageReducer from './reducers/messageReducer';
import filterReducer from './reducers/filterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers({
        anecdotes: anecdoteReducer,
        message: messageReducer,
        filter: filterReducer
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

export default store;