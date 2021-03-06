import Vue from 'vue';
import 'bootstrap';
import $ from 'jquery';

import axios from 'axios'; // 主要 AJAX 套件
import VueAxios from 'vue-axios';
// Vue scroll reveal
import VueScrollReveal from 'vue-scroll-reveal';


// loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// 驗證套件
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

// Sweet alert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// $符號、日期格式化
import CKEditor from '@ckeditor/ckeditor5-vue';
import ZoomHover from 'vue-zoom-on-hover';
import dateFormate from './filters/dateFormate';
import dateFormateDetail from './filters/dateFormateDetail';
import currencyFilter from './filters/currency';

// 文字編輯器

// 圖片放大套件，參考 https://github.com/Intera/vue-zoom-on-hover

// Event bus
import './bus';


// TODO 研究如何使用 Vuefire
import '@/database/firebase';


import App from './App.vue';


import router from './router';
import store from './store';

// Hover.css
import '../node_modules/hover.css/css/hover-min.css';

// 自訂 CSS
import './assets/main.scss';

Vue.use(VueAxios, axios);
window.axios = axios;
window.$ = $;
// 過場特效
Vue.component('Loading', Loading);

// 全域啟用 filters
Vue.filter('currency', currencyFilter);
Vue.filter('dateFormate', dateFormate);
Vue.filter('dateFormateDetail', dateFormateDetail);
Vue.use(CKEditor);
Vue.use(ZoomHover);
Vue.use(VueSweetalert2);


Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 2000, // 持續時間
  reset: false,
  // origin: 'left', // top right bottom left
  // scale: 1,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  distance: '500px',
  mobile: true,
});


// 前端 axios 請求附帶 Cookies 設定
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW',
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');


Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW,
  },
});

router.beforeEach((to, from, next) => {
  // 如果進入的畫面需要驗證，則執行 check 這個 API 程式
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    // 需改成 axios。this.$http 是元件才有的方法
    axios.post(api).then((response) => {
      if (response.data.success) {
        // 如果成功則進入下一頁
        next();
      } else {
        // 否則轉回 login
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
