const mostLikes = require('../utils/list_helpers').mostLikes;

describe('most likes', () => {
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
            title: 'Lets talk big about smalltalk',
            author: 'Alan Key',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 16,
            __v: 0
        }
    ];

    it('should return null for empty array', () => {
        expect(mostLikes([])).toBe(null);
    });

    it('should return the author with most likes', () => {
        expect(mostLikes(list)).toEqual({
            author: 'Alan Key',
            likes: 22
        });
    });
});
