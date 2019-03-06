import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);


// 路由配置
const router = new VueRouter({
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: [{
        path: '/list',
        meta: {
            title: '商品列表',
        },
        component: resolve => require(['./views/list.vue'], resolve)
    }, {
        path: '/product/:id',
        meta: {
            title: '商品详情'
        },
        component: resolve => require(['./views/product.vue'], resolve)
    }, {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: resolve => require(['./views/cart.vue'], resolve)
    }, {
        path: '*',
        redirect: '/list'
    }]
});

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router;