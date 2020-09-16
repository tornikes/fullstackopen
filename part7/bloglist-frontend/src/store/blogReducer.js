import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

export default function blogReducer(state = [], action) {
    switch (action.type) {
        case 'BLOGS_FETCHED': return action.data.blogs;
        case 'NEW_BLOG': return state.concat(action.data.blog);
        case 'UPDATED': return state.map(blog => blog.id === action.data.blog.id ? action.data.blog : blog);
        case 'REMOVED': return state.filter(blog => blog.id !== action.data.id);
        default: return state;
    }
}

export function initializeBlogs() {
    return async function (dispatch) {
        const blogs = await blogService.getAll().then(blogs => {
            blogs.sort((b1, b2) => b2.likes - b1.likes);
            return blogs;
        });
        dispatch(blogsFetched(blogs));
    }
}

export function createBlog(blog) {
    return async function (dispatch) {
        try {
            const nextBlog = await blogService.create(blog);
            dispatch(blogCreated(nextBlog));
            dispatch(setNotification(`added blog ${nextBlog.title} by ${nextBlog.author}`));
        } catch (exception) {

        }
    }
}

export function likeBlog(id, payload) {
    return async function (dispatch) {
        try {
            const nextBlog = await blogService.update(id, payload);
            dispatch(blogUpdated(nextBlog));
        } catch (exception) {
            console.log(exception);
        }
    }
}

export function removeBlog(blog) {
    return async function (dispatch) {
        try {
            const removed = await blogService.remove(blog.id);
            dispatch(blogRemoved(removed.id));
        } catch (exception) {
            console.log(exception);
        }
    }
}

export function blogsFetched(blogs) {
    return {
        type: 'BLOGS_FETCHED',
        data: { blogs }
    }
}

export function blogCreated(blog) {
    return {
        type: 'NEW_BLOG',
        data: { blog }
    }
}

export function blogUpdated(blog) {
    return {
        type: 'UPDATED',
        data: { blog }
    };
}

export function blogRemoved(id) {
    return {
        type: 'REMOVED',
        data: { id }
    }
}