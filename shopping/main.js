import Vue from 'vue';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';
import router from './router';

import product_data from './product.js';

Vue.use(Vuex);


function getFilterArray(array) {
    const res = [], json = {};
    array.map((item, i) => {
        if (!json[item]) {
            res.push(item);
            json[item] = 1;
        }
    });
    return res;
}

const store = new Vuex.Store({
    state: {
        // 商品列表数据
        productList: [],
        // 购物车数据
        cartList: []
    },
    getters: {
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands);
        },
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors);
        }
    },
    mutations: {
        // 添加商品列表
        setProductList(state, data) {
            state.productList = data;
        },
        addCart(state, id) {
            let isAdded = state.cartList.find((item, i) => item.id === id);
            if (isAdded) {
                isAdded.count++;
            } else {
                state.cartList.push({id, count: 1})
            }
        },
        editCartCount(state, cartObj) {
            let editCart = state.cartList.find(item => item.id === cartObj.id);
            editCart.count += cartObj.count
        },
        deleteCart(state, id) {
            let index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        emptyCart(state){
            state.cartList = [];
        }
    },
    actions: {
        // 请求商品列表
        getProductList(context) {
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500)
        },
        buy(context){
            return new Promise(resolve =>{
                setTimeout(()=>{
                    context.commit('emptyCart');
                },500);
            })
        }
    }
});

new Vue({
    router: router,
    store: store,
    render: h => h(App)
}).$mount('#app');