import axios from 'axios';

const baseUrl = '/api/comments';

async function create(id, content) {
    const comment = await axios.post(baseUrl, { id, content });
    return comment.data;
}

export default { create };