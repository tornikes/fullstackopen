import axios from 'axios';

const baseUrl = '/api/users';

async function getAll() {
    const resp = await axios.get(baseUrl);
    return resp.data;
}

async function getOne(id) {
    const resp = await axios.get(`${baseUrl}/${id}`);
    return resp.data;
}

export default { getAll, getOne }