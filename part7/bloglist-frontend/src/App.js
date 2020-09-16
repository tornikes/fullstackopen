import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import ToggleAble from './components/Toggleable';
import Users from './components/Users';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './store/blogReducer';
import { logOut, logIn } from './store/userReducer';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import User from './components/User';
import SingleBlog from './components/SingleBlog';
import Navbar from './components/Navbar';

const App = () => {
    const blogs = useSelector(state => state.blogs);
    const message = useSelector(state => state.notification);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const formRef = React.useRef();

    const match = useRouteMatch('/users/:id');
    const blogMatch = useRouteMatch('/blogs/:id');

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

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
            <Navbar user={user} handleLogout={handleLogout} />
            {message && <Notification message={message} />}            
            <Switch>
                <Route path='/users/:id'>
                    <User match={match} />
                </Route>
                <Route path='/users'>
                    {user ? <Users /> : <Redirect to='/' />}
                </Route>
                <Route path='/blogs/:id'>
                    <SingleBlog match={blogMatch} />
                </Route>
                <Route path='/'>
                    {user === null && <LoginForm
                        handleUsername={setUsername}
                        handlePassword={setPassword}
                        username={username}
                        password={password}
                        handleLogin={handleLogin}
                    />}
                    {user && <>
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
                </Route>
            </Switch>
        </div>
    )
}

export default App