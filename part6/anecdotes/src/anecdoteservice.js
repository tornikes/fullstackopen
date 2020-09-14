import axios from 'axios';
const baseUrl = 'http://localhost:3001';

async function fetchAll() {
    const resp = await axios.get(`${baseUrl}/anecdotes`);
    return resp.data;
}

async function createAnecdote(contents) {
    const resp = await axios.post(`${baseUrl}/anecdotes`, { content: contents, votes: 0 });
    return resp.data;
}

async function vote(anecdote) {
    const resp = await axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, anecdote);
    return resp.data;
}

export default { fetchAll, createAnecdote, vote };