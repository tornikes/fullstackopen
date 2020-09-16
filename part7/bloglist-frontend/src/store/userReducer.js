import { setNotification } from "./notificationReducer";
import loginService from '../services/login';
import blogService from '../services/blogs';

export default function userReducer(state = null, action) {
    switch (action.type) {
        case 'LOGGED_IN': return action.data.user;
        case 'LOGGED_OUT': return null;
        default: return state;
    }
}

export function logIn(credentials) {
    return async function (dispatch) {
        try {
            const user = await loginService.login(credentials);
            dispatch(loggedIn(user));
            blogService.setToken(user.token);
            dispatch(setNotification('Successfully logged-in'));
        } catch (exception) {
            dispatch(setNotification('Username or password invalid'));
        }
    }
}

export function logOut() {
    return async function (dispatch) {
        blogService.setToken(null);
        dispatch(loggedOut());
    }
}

export function loggedIn(user) {
    return {
        type: 'LOGGED_IN',
        data: { user }
    }
}

export function loggedOut() {
    return {
        type: 'LOGGED_OUT'
    }
} 