import axios from 'axios';
import config from '../config'
import { loadAbourt } from '../utils/loadAbout';


const instance = axios.create();

instance.defaults.baseURL = config.API_URL;
instance.defaults.headers.common[ 'Accept' ] = 'application/json';
instance.defaults.headers.common[ 'Content-Type' ] = 'application/json';

export const get = id => {
    const controller = loadAbourt();
    return {
        call: instance.get('/user' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export const getAll = () => {
    const controller = loadAbourt();
    return {
        call: instance.get('/user', {
            signal: controller.signal,
        }),
        controller,
    };
};

export const create = payload => {
    const controller = loadAbourt();
    return {
        call: instance.post('/user', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};

export const update = payload => {
    const controller = loadAbourt();
    return {
        call: instance.put('/user', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};


export const remove = id => {
    const controller = loadAbourt();
    return {
        call: instance.delete('/user' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export default instance;