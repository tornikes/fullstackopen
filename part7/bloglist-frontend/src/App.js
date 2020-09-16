import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import ToggleAble from './components/Toggleable';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './store/blogReducer';
import { logOut, logIn } from './store/userReducer';

const App = () => {
    const blogs = useSelector(state => state.blogs);
    const message = useSelector(state => state.notification);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const formRef = React.useRef();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        dispatch(logIn({ username, password }));
        setUsername('');
        setPassword('');
    }

    async function submitBlogForm(blog) {
        try {
            dispatch(createBlog(blog));
            formRef.current.toggleVisibility();
        } catch (exception) {
            console.log(exception);
        }
    }

    function handleLogout() {
        dispatch(logOut());
    }

    async function handleLike(id, payload) {
        dispatch(likeBlog(id, payload));
    }

    async function handleRemove(blog) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(removeBlog(blog));
        }
    }

    return (
        <div>
            {message && <Notification message={message} />}
            {user === null && <LoginForm
                handleUsername={setUsername}
                handlePassword={setPassword}
                username={username}
                password={password}
                handleLogin={handleLogin}
            />}
            {user && <>
                <h1>Hello, {user.name}</h1>
                <button onClick={handleLogout}>Logout</button>
                <ToggleAble buttonLabel='New Blog' ref={formRef}>
                    <BlogForm submitBlogForm={submitBlogForm} />
                </ToggleAble>
            </>}
            {user && <h2>blogs</h2>}
            {user && blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    onLike={handleLike}
                    userId={user.id}
                    onRemove={handleRemove}
                />
            )}
        </div>
    )
}

export default App