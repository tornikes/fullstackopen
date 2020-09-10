const mostBlogs = require('../utils/list_helpers').mostBlogs;

describe('mostBlogs', () => {
    const list = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Lambda the ultimate',
            author: 'Gerald Sussman',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 15,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'How to oop',
            author: 'Alan Key',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 6,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Structure And Interpretation of Computer Programs',
            author: 'Gerald Sussman',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 15,
            __v: 0
        }
    ];

    const edsger = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 7,
            __v: 0
        }
    ];

    it('returns null for empty array', () => {
        expect(mostBlogs([])).toBe(null);
    });

    it('correctly handles array of one element', () => {
        expect(mostBlogs(edsger)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        });
    });

    it('correctly finds author with the most blogs', () => {
        expect(mostBlogs(list)).toEqual({
            author: 'Gerald Sussman',
            blogs: 2
        });
    });
});