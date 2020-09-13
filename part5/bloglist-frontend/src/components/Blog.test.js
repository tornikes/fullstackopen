import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('blog component', () => {
    let component;
    const blog = { author: 'Martin Fowler', title: 'How to code', url: 'google.com', likes: 100, user: { id: 100, name: 'Zombie McZombie' } };

    beforeEach(() => {
        component = render(
            <Blog blog={blog} />
        );
    });

    it('should render title and author but not url and likes', () => {
        const addInfo = component.container.querySelector('.additional-info');
        expect(addInfo).toBe(null);
    });

    it('should reveal url and likes', () => {
        const button = component.container.querySelector('button');
        fireEvent.click(button);
        const addInfo = component.container.querySelector('.additional-info');
        expect(addInfo).toBeDefined();
    });

    it('should fire onLike event twice', () => {
        const likeMock = jest.fn();
        const component = render(
            <Blog blog={blog} onLike={likeMock} />
        );
        const button = component.container.querySelector('button');
        fireEvent.click(button);
        const likeButton = component.getByText('Like');
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);
        expect(likeMock.mock.calls).toHaveLength(2);
    });
});