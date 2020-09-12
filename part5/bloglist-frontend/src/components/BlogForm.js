import React, { useState } from 'react';

export default function BlogForm({ submitBlogForm }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        submitBlogForm({
            title,
            author,
            url
        });
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p>title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} /></p>
                <p>author: <input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></p>
                <p>url: <input type="text" value={url} onChange={e => setUrl(e.target.value)} /></p>
            </div>
            <button>Create</button>
        </form>
    );
}