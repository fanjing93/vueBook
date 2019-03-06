import axios from 'axios';

const Utils = {
    imgPath: 'http://127.0.0.1:8011/img/',
    apiPath: 'http://127.0.0.1:8001/',
};

Utils.ajax = axios.create({
    baseUrl: Utils.apiPath
});

Utils.ajax.interceptors.response.use(res => {
    return res.data;
});

export default Utils;

