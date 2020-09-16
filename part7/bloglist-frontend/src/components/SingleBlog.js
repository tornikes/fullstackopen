import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, initializeBlogs } from '../store/blogReducer';
import CommentForm from './CommentForm';
import commentService from '../services/comment';

export default function SingleBlog({ match }) {
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blogs.find(b => b.id === match.params.id));
    
    function handleLike() {
        dispatch(likeBlog(blog.id, {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }));
    }

    async function onComment(data) {
        await commentService.create(data.id, data.content);
        dispatch(initializeBlogs());
    }

    if (!blog) {
        return null;
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes <button onClick={() => handleLike(blog.id, blog)}>Like</button></p>
            added by {blog.user.name}

            <CommentForm onComment={onComment} id={blog.id} />
            {blog.comments.length > 0 &&
                <>
                    <h3>Comments</h3>
                    <ul>
                        {blog.comments.map(c => (
                            <li key={c.id}>{c.content}</li>
                        ))}
                    </ul>
                </>
            }
        </div>
    );
}