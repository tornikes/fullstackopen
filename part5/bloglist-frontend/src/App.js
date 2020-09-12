import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import Notification from './components/Notification';
import ToggleAble from './components/Toggleable';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState('');
    const formRef = React.useRef();

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((b1, b2) => b2.likes - b1.likes);
            setBlogs(blogs);
        });
    }, []);

    useEffect(() => {
        let data = window.localStorage.getItem('loggedInUser');
        if (data) {
            const user = JSON.parse(data);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
            setMessage('Successfully Logged-In');
            setIsError(false);
            setTimeout(() => {
                setMessage('');
                setIsError(false);
            }, 3000);
        } catch (exception) {
            setMessage('Username or password invalid');
            setIsError(true);
            setTimeout(() => {
                setMessage('');
                setIsError(false);
            }, 3000);

        }
    }

    async function submitBlogForm(blog) {
        try {
            const nextBlog = await blogService.create(blog);
            setBlogs(blogs.concat(nextBlog));
            setMessage(`A new blog ${nextBlog.title} by ${nextBlog.author} added.`);
            setIsError(false);
            formRef.current.toggleVisibility();
            setTimeout(() => {
                setMessage('');
                setIsError(false);
            }, 3000);
        } catch (exception) {
            console.log(exception);
        }
    }

    function handleLogout() {
        window.localStorage.removeItem('loggedInUser');
        setUser(null);
    }

    async function handleLike(id, payload) {
        try {
            const nextBlog = await blogService.update(id, payload);
            setBlogs(blogs.map(b => b.id === nextBlog.id ? nextBlog : b));
        } catch (exception) {
            console.log(exception);
        }
    }

    async function handleRemove(blog) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                const removed = await blogService.remove(blog.id);
                console.log(removed);
                setBlogs(blogs.filter(b => b.id !== removed.id));
            } catch (exception) {
                console.log(exception);
            }
        }
    }

    return (
        <div>
            {message && <Notification isError={isError} message={message} />}
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