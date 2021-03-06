import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog, onLike, userId, onRemove }) => {
    const [expanded, setExpanded] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    function likeBlog() {
        onLike(blog.id, {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        });
    }

    function removeBlog(e) {
        e.stopPropagation();
        onRemove(blog);
    }

    return (
        <div style={blogStyle} className="blog-info">
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide' : 'View'}</button>
            {expanded && <div className="additional-info">
                <p>{blog.url}</p>
                <p>Likes <span className="likes">{blog.likes}</span> <button onClick={likeBlog}>Like</button></p>
                {blog.user && <p>{blog.user.name}</p>}
                {blog.user.id === userId && <button onClick={removeBlog}>remove</button>}
            </div>}
        </div>
    );
}

Blog.propTypes = {
    onLike: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    blog: PropTypes.object.isRequired 
};

export default Blog
