/**
 * Created by chenxuhua on 2017/9/6.
 */
import Vue from 'vue'
import router from '@/router'
import App from '@/App'
import store from '@/store/'
import Bread from '@/components/common/Bread'


//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

//自定义加载区start
require('@/css/iconfont/iconfont.css');//引入阿里巴巴字体库 keney add
import '@/css/reset.css';
import 'normalize.css';
import '@/css/main.css';
//自定义加载区end

window.pageCommon = (require('@/commonjs/pageCommon.js')).pageCommon;
window.requestApi = require('@/commonjs/requestApi').default;

Vue.component('breadcrumb',Bread)
window.vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});

