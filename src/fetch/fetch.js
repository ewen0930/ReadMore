import axios from 'axios';
import qs from 'qs';

// axios.defaults.baseURL = 'http://api.zhuishushenqi.com';
axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 10000;

// Add a request interceptor
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    if (!response.status === 200) {
        return Promise.reject(response);
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default async(url = '', data = {}, method = 'get') => {
    method = method.toLowerCase();
    if (method === 'get') {
        let dataArr = []; //数据拼接字符串
        for (let [key, value] of Object.entries(data)) {
            dataArr.push(key + '=' + value);
        }
        if (dataArr.length > 0) {
            url += '?' + dataArr.join('&');
        }

        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(response => {
                    resolve(response.data.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                   reject(error)
                })
        });
    } else if (method === 'post') {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data.data);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                   reject(error)
                })
        });
    } else {
        return Promise.reject('传递的参数错误');
    }
}
