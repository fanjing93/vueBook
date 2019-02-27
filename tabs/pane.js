Vue.component('pane', {
    name: 'pane',
    template: '\
    <div class="pane" v-show="show">\
        <slot></slot>\
    </div>',
    data: function () {
        return {
            show: true
        }
    },
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        },
        closable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        updateNav() {
            this.$parent.updateNav();
        }
    },
    watch: {
        label: {
            label() {
                this.updateNav();
            }
        }
    },
    mounted() {
        this.updateNav();
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    }
});