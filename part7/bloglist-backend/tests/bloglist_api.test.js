const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const BlogEntry = require('../models/blogEntry');
const User = require('../models/user');

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
    await User.deleteMany({});
    await api.post('/api/users').send({ username: 'zombie', password: 'eat-the-living', name: 'nameless' });
    const user = await api.post('/api/login').send({ username: 'zombie', password: 'eat-the-living' });
    await Promise.all(seedData.map(data => api.post('/api/blogs').send(data).set('Authorization', `bearer ${user.body.token}`)));
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
    const user = await api.post('/api/login')
        .send({ username: 'zombie', password: 'eat-the-living' });   
    const nextEntry = {
        title: 'The Little JavaScripter',
        author: 'Douglas Crockford',
        likes: 10000,
        url: 'https://javascript'
    };
    const resp = await api.post('/api/blogs').send(nextEntry).set('Authorization', `bearer ${user.body.token}`);
    for (let [key, value] of Object.entries(nextEntry)) {
        expect(resp.body[key]).toBe(value);
    }
    const data = await api.get('/api/blogs');
    expect(data.body.length).toBe(seedData.length + 1);
});

it('should default likes property to 0', async () => {
    const user = await api.post('/api/login')
        .send({ username: 'zombie', password: 'eat-the-living' });
    const nextEntry = {
        title: 'The Little JavaScripter',
        author: 'Douglas Crockford',
        url: 'https://javascript'
    };
    const resp = await api.post('/api/blogs').send(nextEntry).set('Authorization', `bearer ${user.body.token}`);
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
    const user = await api.post('/api/login')
        .send({ username: 'zombie', password: 'eat-the-living' });
    const created = await api.post('/api/blogs')
        .send({ author: 'zombie', title: 'zombieland', url: 'zzzzz', likes: 999 })
        .set('Authorization', `bearer ${user.body.token}`);
    const removed = await api.delete(`/api/blogs/${created.body.id}`).set('Authorization', `bearer ${user.body.token}`);
    const remaining = await api.get('/api/blogs');
    expect(remaining.body.length).toBe(seedData.length);
    for (let item of remaining.body) {
        expect(item).not.toEqual(removed);
    }
});

it('updates item using id', async () => {
    const data = await api.get('/api/blogs');
    const secondItem = data.body[1];
    const nextItem = {
        ...secondItem,
        user: secondItem.user.id,
        likes: 12345
    };
    console.log(nextItem);
    const resp = await api.put(`/api/blogs/${secondItem.id}`).send(nextItem);
    expect(resp.body.likes).toBe(nextItem.likes);
});


afterAll(async () => {
    await mongoose.connection.close();
});