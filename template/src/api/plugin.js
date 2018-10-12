import {HttpClient} from '@/api/client';
import api from '@/api';
import codes from '@/api/codes';
import urls from '@/api/urls';

const HttpPlugin = {
  register() {
    if (!String.prototype.format) {
      // eslint-disable-next-line no-extend-native
      String.prototype.format = function() {
        let str = this.toString();
        if (!arguments.length) {
          return str;
        }
        let args = typeof arguments[0];
        args = (
            (args === 'string' || args === 'number')
            ? arguments
            : arguments[0]
          );
        for (let arg in args) {
          str = str.replace(RegExp('\\{' + arg + '\\}', 'gi'), args[arg]);
        }
        return str;
      };
    }
  },
  install(Vue, option) {
    this.register();
    HttpClient.init(option);
    Vue.prototype.$api = api;
    Vue.prototype.$codes = codes;
    Vue.prototype.$urls = urls;
  }
};

export {HttpPlugin};
