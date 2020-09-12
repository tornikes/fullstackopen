import React, { useState, useEffect } from 'react'
import './App.css';
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState('');

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, []);

    useEffect(() => {
        let data = window.localStorage.getItem('loggedInUser');
        if (data) {
            const user = JSON.parse(data)
            setUser(user)
            blogService.setToken(user.token)
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
            setTimeout(() => {
                setMessage('');
                setIsError(false);
            }, 3000);
        } catch(exception) {
            console.log(exception);
        }
    }

    function handleLogout() {
        window.localStorage.removeItem('loggedInUser');
        setUser(null);
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
                <BlogForm submitBlogForm={submitBlogForm} />
            </>}
            {user && <h2>blogs</h2>}
            {user && blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App