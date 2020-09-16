import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog } from '../store/blogReducer';

export default function SingleBlog({ match }) {
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blogs.find(b => b.id === match.params.id));

    function handleLike(id, payload) {
        dispatch(likeBlog(blog.id, {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }));
    }

    if(!blog) {
        return null;
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes <button onClick={() => handleLike(blog.id, blog)}>Like</button></p>
            added by {blog.user.name}
        </div>
    );
}