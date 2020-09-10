import axios from 'axios';

const baseUrl = '/api/persons';

function fetchAll() {
    return axios.get(`${baseUrl}`)
        .then(res => res.data);
}

function addPerson(person) {
    return axios.post(baseUrl, person);
}

function deletePerson(id) {
    return axios.delete(`${baseUrl}/${id}`);
}

function updatePerson(id, newPerson) {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data);
}

export default { fetchAll, addPerson, deletePerson, updatePerson }