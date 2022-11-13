import axios from 'axios';
import config from '../config'
import { loadAbourt } from '../utils/loadAbout';


const instance = axios.create();

instance.defaults.baseURL = config.API_URL;
instance.defaults.headers.common[ 'Accept' ] = 'application/json';
instance.defaults.headers.common[ 'Content-Type' ] = 'application/json';

export const GetProyectoById = id => {
    const controller = loadAbourt();
    return {
        call: instance.get('/proyecto/' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export const getProyectosByFilter = (text, empresaId) => {
    var url = '/proyecto/getByFilter?text=' + text

    if (empresaId) {
        url = url + '&empresaId=' + empresaId
    }
    const controller = loadAbourt();
    return {
        call: instance.get(url, {
            signal: controller.signal,
        }),
        controller,
    };
};

export const CreateProyecto = payload => {
    const controller = loadAbourt();
    return {
        call: instance.post('/proyecto', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};

export const UpdateProyecto = payload => {
    const controller = loadAbourt();
    return {
        call: instance.put('/proyecto', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};


export const DeleteProyecto = id => {
    const controller = loadAbourt();
    return {
        call: instance.delete('/proyecto/' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export default instance;