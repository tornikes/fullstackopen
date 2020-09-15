import { useState, useEffect } from 'react';
import axios from 'axios';

export function useResource(baseUrl) {
    const [resources, setResources] = useState([]);
    let token = null;
    const setToken = newToken => {
        token = `bearer ${newToken}`;
    }

    const getAll = async () => {
        const request = await axios.get(baseUrl);
        const data = await request.data;
        setResources(data);
        return data;
    }

    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        };
        const response = await axios.post(baseUrl, newObject, config);
        setResources(resources.concat(response.data));
        return response.data;
    }

    useEffect(() => {
        getAll();
    }, []);

    return [resources, {
        setToken,
        getAll,
        create,
    }];
}