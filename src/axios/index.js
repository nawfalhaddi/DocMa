import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.1.4/drma/public/api/'
    // baseURL: 'https://docmorocco.000webhostapp.com/api/'
});