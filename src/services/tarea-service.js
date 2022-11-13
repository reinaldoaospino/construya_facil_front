import axios from 'axios';
import config from '../config'
import { loadAbourt } from '../utils/loadAbout';


const instance = axios.create();

instance.defaults.baseURL = config.API_URL;
instance.defaults.headers.common[ 'Accept' ] = 'application/json';
instance.defaults.headers.common[ 'Content-Type' ] = 'application/json';

export const GetTareaById = id => {
    const controller = loadAbourt();
    return {
        call: instance.get('/tarea/' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export const getTareasByFilter = (text, proyectoId) => {

    var url = '/tarea/getByFilter'
    if (text) {
        url = url + '?text=' + text
    }

    if (proyectoId) {
        url = url + '?proyectoId=' + proyectoId
    }

    const controller = loadAbourt();
    return {
        call: instance.get(url, {
            signal: controller.signal,
        }),
        controller,
    };
};

export const CreateTarea = payload => {
    const controller = loadAbourt();
    return {
        call: instance.post('/tarea', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};

export const UpdateTarea = payload => {
    const controller = loadAbourt();
    return {
        call: instance.put('/tarea', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};


export const DeleteTarea = id => {
    const controller = loadAbourt();
    return {
        call: instance.delete('/tarea/' + id, {
            signal: controller.signal,
        }),
        controller,
    };
};

export default instance;