import React, { useState } from 'react';

export default function CommentForm({ id, onComment }) {
    const [comment, setComment] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onComment({ id, content: comment });
        setComment('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={comment} 
                onChange={e => setComment(e.target.value)}
            />
            <button type='submit'>Add Comment</button>
        </form>
    );
}