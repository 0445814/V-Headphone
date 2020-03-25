import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // Vuex 嚴謹模式
  strict: true,
  state: {
    isEnterLoading: true,
    // 過場特效切換
    isLoading: false,
    // 類型
    types: ['Headphone', 'DAC'],
    // 品牌
    brands: {
      Headphone: ['ATH', 'SONY', 'STAX', 'Sennheiser', 'Beyerdynamic'],
      DAC: ['TEAC', 'Audio Research'],
    },
    banners: [],
    // 後台使用的產品資訊
    products: [],
    // 分頁
    pagination: {},
    // 前台使用的產品資訊
    allProducts: [],
    // 進入 /product 預設顯示是 type 為 Headphone 的產品
    selectedCategory: 'Headphone',
    // 購物車
    carts: {
      carts: [],
    },
    // 使用者登入、註冊表單的 title，預設顯示是會員登入
    formTitle: '會員登入',

  },
  mutations: {
    ENTERLOADING(state, payload) {
      state.isEnterLoading = payload;
    },
    // 過場特效
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    // 儲存前台圖片
    BANNERS(state, payload) {
      state.banners.push(payload);
    },
    // 儲存前台所有產品資訊
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    // 儲存後台具有分頁的產品資訊
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    // 分頁
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    // 儲存所有購物車資訊
    CARTS(state, payload) {
      state.carts = payload;
    },
    // 改變所選擇的產品分類
    CHANGECATEGORY(state, payload) {
      state.selectedCategory = payload;
    },

    // 改變使用者登入、註冊時的表單 title
    CHANGEFORMTITLE(state, payload) {
      state.formTitle = payload;
    },
  },
  actions: {
    // 啟用過場特效
    updateLoading(context, payload) {
      context.commit('LOADING', payload);
    },

    // 取得 Banners
    getBanners(context) {
      const databaseRef = firebase.database().ref('banners');

      databaseRef.once('value', (snapshot) => {
        snapshot.forEach((item) => {
          context.commit('BANNERS', item.val());
        });
      });
    },

    // 取得所有產品(前台使用)
    getAllProducts(context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(apiUrl).then((response) => {
        context.commit('ALLPRODUCTS', response.data.products);
        context.commit('LOADING', false);
      });
    },
    // 取得具有分頁的產品資訊(後台使用)
    getProducts(context, payload = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${payload}`;
      context.commit('LOADING', true);

      axios.get(apiUrl).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        // 取得分頁
        context.commit('PAGINATION', response.data.pagination);
        context.commit('LOADING', false);
      });
    },

    // 取得購物車資訊
    getCarts(context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(apiUrl).then((response) => {
        context.commit('CARTS', response.data.data);
        context.commit('LOADING', false);
      });
    },

    // 改變選擇的產品分類
    changeCategory(context, payload) {
      context.commit('CHANGECATEGORY', payload);
    },

    // 改變使用者登入、註冊時的表單 title
    changeFormTitle(context, payload) {
      context.commit('CHANGEFORMTITLE', payload);
    },
  },

});
