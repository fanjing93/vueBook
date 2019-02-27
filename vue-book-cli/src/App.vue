<template>
    <div id="app">
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick" color="#f0f">点击按钮</v-button>
    </div>
</template>

<script>
    import vTitle from './components/title.vue'
    import vButton from './components/button.vue'

    export default {
        name: 'app',
        data() {
            return {
                name: 'Vue.js'
            }
        },
        components: {
            vTitle,
            vButton
        },
        methods: {
            handleClick(e) {
                console.log(e);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    div {
        color: #f60;
        font-size: 24px;
    }
</style>
