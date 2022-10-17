import axios from 'axios';
import config from '../config'
import { loadAbourt } from '../utils/loadAbout';


const instance = axios.create();

instance.defaults.baseURL = config.API_URL;
instance.defaults.headers.common[ 'Accept' ] = 'application/json';
instance.defaults.headers.common[ 'Content-Type' ] = 'application/json';



export const login = (email, password) => {
    const payload = {
        email,
        password
    }
    const controller = loadAbourt();
    return {
        call: instance.post('/auth/login', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};

export const sigUp = ( name, lasName, email, password ) => {
    const payload = {
        name,
        lasName,
        email,
        password
    }
    const controller = loadAbourt();
    return {
        call: instance.post('/auth/signup', {
            ...payload,
            signal: controller.signal,
        }),
        controller,
    };
};
export default instance;