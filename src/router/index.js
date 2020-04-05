import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [{
  path: '*',
  redirect: '/',
},
{
  path: '/',
  component: Home,
  children: [{
    path: '',
    component: () => import('@/views/LandingPage.vue'),
  },
  {
    path: 'product',
    component: () => import('@/components/product/Product.vue'),
  },
  {
    path: 'product/:productId',
    component: () => import('@/components/product/ProductItem.vue'),
  },
  {
    path: 'cart',
    component: () => import('@/components/cart/Cart.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/cart/CartForm.vue'),
      },
      {
        path: 'checkout',
        component: () => import('@/components/cart/Checkout.vue'),
      },
      {
        path: 'checkout/:orderId',
        component: () => import('@/components/cart/CheckoutOrder.vue'),
      },
    ],
  },
  {
    path: 'warranty',
    component: () => import('@/views/Warranty.vue'),
  },
  {
    path: 'parallel_import',
    component: () => import('@/components/Parallel_Import.vue'),
  },
  {
    path: 'parallel_import/:parallel_id',
    component: () => import('@/components/Parallel_Import__Detail.vue'),
  },
  {
    path: 'user',
    component: () => import('@/components/user/User.vue'),
    children: [{
      path: 'login',
      component: () => import('@/components/user/Login.vue'),
    },
    {
      path: 'forgot_password',
      component: () => import('@/components/user/LoginForgotPassword.vue'),
    },
    {
      path: 'register',
      component: () => import('@/components/user/Register.vue'),
    },
    ],
  },
  ],
},
{
  name: '後台登入',
  path: '/admin/login',
  component: () => import('@/views/admin/AdminLogin.vue'),
},
{
  name: '後台介面',
  path: '/admin',
  component: () => import('@/views/admin/Dashboard.vue'),
  children: [
    {
      path: 'products',
      component: () => import('@/components/admin/AdminProducts.vue'),
    },
    {
      path: 'orders',
      component: () => import('@/components/admin/AdminOrders.vue'),
    },
    {
      path: 'parallel',
      component: () => import('@/components/admin/AdminParallel.vue'),
    },
    {
      path: 'members',
      component: () => import('@/components/admin/AdminMembers.vue'),
    },
    {
      path: 'coupons',
      component: () => import('@/components/admin/AdminCoupons.vue'),
    },
    {
      path: 'uploadImages',
      component: () => import('@/components/admin/AdminUploadImages.vue'),
    },
    {
      path: 'uploadPosts',
      component: () => import('@/components/admin/AdminUploadPosts.vue'),
    },
    {
      path: 'uploadPosts-result',
      component: () => import('@/components/admin/AdminPostResult.vue'),
    },
  ],
},
];

const router = new VueRouter({
  // mode: 'history',
  routes,
  // 這樣也可以在切換路由時，將畫面移至上方
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
});

export default router;
