const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const BlogEntry = require('../models/blogEntry');

const seedData = [
    {
        title: 'Lambda the ultimate',
        author: 'Gerald Sussman',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15
    },
    {
        title: 'How to oop',
        author: 'Alan Key',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7
    },
    {
        title: 'Lets talk big about smalltalk',
        author: 'Alan Key',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 16
    }
];


const api = supertest(app);

beforeEach(async () => {
    await BlogEntry.deleteMany({});
    await Promise.all(seedData.map(data => new BlogEntry(data).save()));
});

it('should get data correctly', async () => {
    const data = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
    expect(data.body.length).toBe(seedData.length);
});

it('should give every entry a property called "id"', async () => {
    const data = await api.get('/api/blogs');
    for (let entry of data.body) {
        expect(entry.id).toBeDefined();
    }
});

it('should add a new entry do the database', async () => {
    const nextEntry = {
        title: 'The Little JavaScripter',
        author: 'Douglas Crockford',
        likes: 10000,
        url: 'https://javascript'
    };
    const resp = await api.post('/api/blogs').send(nextEntry);
    for (let [key, value] of Object.entries(nextEntry)) {
        expect(resp.body[key]).toBe(value);
    }
    const data = await api.get('/api/blogs');
    expect(data.body.length).toBe(seedData.length + 1);
});

it('should default likes property to 0', async () => {
    const nextEntry = {
        title: 'The Little JavaScripter',
        author: 'Douglas Crockford',
        url: 'https://javascript'
    };
    const resp = await api.post('/api/blogs').send(nextEntry);
    expect(resp.body.likes).toBeDefined();
    expect(resp.body.likes).toBe(0);
});

it('should return 400 if url or title is missing', async () => {
    await api
        .post('/api/blogs')
        .send({ likes: 300, author: 'Some Guy' })
        .expect(400);
});

it('deletes entry using id', async () => {
    const data = await api.get('/api/blogs');
    const secondItem = data.body[1];
    const removed = await api.delete(`/api/blogs/${secondItem.id}`);
    const remaining = await api.get('/api/blogs');
    expect(remaining.body.length).toBe(data.body.length - 1);
    for (let item of remaining.body) {
        expect(item).not.toEqual(removed);
    }
});

it('deletes entry using id', async () => {
    const data = await api.get('/api/blogs');
    const secondItem = data.body[1];
    const nextItem = {
        ...secondItem,
        likes: 12345
    };
    const resp = await api.put(`/api/blogs/${secondItem.id}`).send(nextItem);
    expect(resp.body.likes).toBe(nextItem.likes);
});


afterAll(async () => {
    await mongoose.connection.close();
});