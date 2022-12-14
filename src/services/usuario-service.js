import axios from 'axios';
import config from '../config'
import { loadAbourt } from '../utils/loadAbout';


const instance = axios.create();

instance.defaults.baseURL = config.API_URL;
instance.defaults.headers.common[ 'Accept' ] = 'application/json';
instance.defaults.headers.common[ 'Content-Type' ] = 'application/json';

export const GetUserById = id => {
    const controller = loadAbourt();
    return {
        call: instance.get('/user/' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export const getAllUsers = () => {
    const controller = loadAbourt();
    return {
        call: instance.get('/user', {
            signal: controller.signal,
        }),
        controller,
    };
};

export const getUsersByFilter = (text, empresaId) => {
    var url = '/user/getByFilter'
    if (text) {
        url = url + '?text=' + text
    }

    if (empresaId) {
        url = url + '?empresaId=' + empresaId
    }
    const controller = loadAbourt();
    return {
        call: instance.get(url, {
            signal: controller.signal,
        }),
        controller,
    };
};

export const CreateUser = payload => {
    const controller = loadAbourt();
    return {
        call: instance.post('/user', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};

export const UpdateUser = payload => {
    const controller = loadAbourt();
    return {
        call: instance.put('/user', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};


export const DeleteUser = id => {
    const controller = loadAbourt();
    return {
        call: instance.delete('/user/' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export default instance;