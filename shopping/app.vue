<template>
    <div>
        <div class="header">
            <router-link to="/list"
                         class="header-title">电商网站示例
            </router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    购物车
                    <span v-if="cartList.length">{{ cartList | filterCount }}</span>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        computed: {
            cartList() {
                return this.$store.state.cartList;
            }
        },
        filters: {
            filterCount(list) {
                let count = 0;
                list.map(function (item) {
                    count += item.count;
                });
                return count;
            }
        }
    }
</script>

<style scoped>
[v-cloak]{
    display: none;
}
</style>