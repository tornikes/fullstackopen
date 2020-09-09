import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function fetchAll() {
    return axios.get(`${baseUrl}`)
        .then(res => res.data);
}

function addPerson(person) {
    return axios.post(baseUrl, person).then(res => res.data);
}

function deletePerson(id) {
    return axios.delete(`${baseUrl}/${id}`);
}

function updatePerson(id, newPerson) {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data);
}

export default { fetchAll, addPerson, deletePerson, updatePerson }