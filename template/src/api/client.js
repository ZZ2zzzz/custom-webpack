import axios from 'axios';
import urls from '@/api/urls';
import { Message } from 'element-ui';
import codes from '@/api/codes';

const HttpClient = {
  init(option) {
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers['Access-Control-Allow-Method'] = '*';
    axios.defaults.baseURL = urls.BASE_URL;
    axios.defaults.timeout = 20 * 1000;       // 默认超时时间
    axios.interceptors.request.use(config => {
      config.url += config.url.indexOf('?') > 0 ? '&' : '?';
      config.url += 'timestamp=' + new Date().getTime();
      return config;
    });

    axios.interceptors.response.use(res => {
      if (res.data.code === codes.SUCCESS) {
        return res.data.data;
      } else {
        return Promise.reject(res);
      }
    }, () => {
      Message({type: 'error', message: '服务器出错！', showClose: true});
    });
  }
};

export {HttpClient};

export default axios;
