let app = new Vue({
    el: '#app',
    data: {
        list: [
            {
                id: 1,
                name: 'iPhone7',
                price: 6188,
                count: 2
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 6188,
                count: 2
            },
            {
                id: 4,
                name: 'iPhone8 Plus',
                price: 7188,
                count: 2
            }
        ]
    },
    filters: {},
    methods: {
        handleReduce:function (index) {
            this.list[index].count--;
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index,1);
        }
    },
    computed: {
        totalPrice: function () {
            let totalPrice = 0;
            this.list.map(function (item) {
                totalPrice += item.price * item.count;
            });
            return totalPrice;
        }
    },
    created: function () {

    },
    mounted: function () {

    },
    beforeDestroy: function () {

    }
});