import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('BlogForm', () => {
    const submitMock = jest.fn();
    const component = render(
        <BlogForm submitBlogForm={submitMock} />
    );
    it('should submit form correctly', () => {
        const form = component.container.querySelector('form');
        const title = component.container.querySelector('#title');
        const author = component.container.querySelector('#author');
        const url = component.container.querySelector('#url');

        fireEvent.change(title, {
            target: { value: 'The Little Javascripter' }
        });
        fireEvent.change(author, {
            target: { value: 'Douglas Crockford' }
        });
        fireEvent.change(url, {
            target: { value: 'javascript.com' }
        });
        fireEvent.submit(form);
        expect(submitMock.mock.calls).toHaveLength(1);
        expect(submitMock.mock.calls[0][0]).toEqual({
            title: 'The Little Javascripter',
            author: 'Douglas Crockford',
            url: 'javascript.com'
        });
    });
});