let padDate = function (date) {
    return (typeof date === 'string' && !isNaN(Number(date)) ? Number(date) > 10 : date > 10) ? date : '0' + date;
};

Vue.component('my-component', {
    props: ['name'],
    template: '<p class="article">{{ name }}</p>'
});

Vue.component('child-component', {
    props: {
        count: {
            type: Number,
            default: 1
        }
    },
    name: 'child-component',
    template: '<div>{{ message }}' +
    '<child-component ' +
    ':count="count + 1" ' +
    'v-if="count < 3"></child-component>' +
    '</div>',
    data: function () {
        return {
            message: '子组件内容'
        }
    },
    methods: {}
});

Vue.component('my-list', {
    props: {
        books: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    template: '<ul>' +
    '<slot name="book" v-for="book in books" :book-name="book.name">' +
    '</slot>' +
    '<slot></slot>' +
    '</ul>',
    mounted() {
        console.log(this.$slots);
    }
});

Vue.component('child-component1', {
    data: function () {
        return {
            msg: '子组件内容'
        }
    }
});

Vue.directive('test', {
    bind(el, binding, vnode) {
        let keys = Object.keys(vnode);
        el.innerHTML =
            'name:' + binding.name + '<br>' +
            'value:' + binding.value + '<br>' +
            'expression ：' + binding.expression + '<br>' +
            'argument:' + binding.arg + '<br>' +
            'modifiers:' + JSON.stringify(binding.modifiers) + '<br>' +
            'vnode keys: ' + keys.join(',')
    }
})

Vue.component('child-component2', function (resolve, reject) {
    window.setTimeout(() => {
        resolve({
            template: '<div>我是异步加载的组件</div>'
        })
    }, 2000);
});

let calculation = {
    props: ['value'],
    template: '<div>' +
    /*  '<button @click="handleClick">+1</button>' +
      '<button @click="handleIncrease">+1</button>' +
      '<button @click="handleReduce" :disabled="reduceDisabled">-1</button>' +*/
    '<input type="text" :value="value" @input="handleInput">' +
    '</div>',
    data: function () {
        return {
            counter: 0,
            reduceDisabled: true
        }
    },
    methods: {
        handleIncrease: function () {
            this.counter++;
            this.counter ? (this.reduceDisabled = false) : (this.reduceDisabled = true);
            this.$emit('increase', this.counter);
        },
        handleReduce: function () {
            this.counter ? this.counter-- && (this.reduceDisabled = false) : (this.reduceDisabled = true);
            this.$emit('increase', this.counter);
        },
        handleClick: function () {
            this.counter++;
            this.$emit('input', this.counter);
        },
        handleInput: function (e) {
            this.$emit('input', e.target.value);
        }
    }
};

let app = new Vue({
    el: '#app',
    data: {
        date: new Date(),
        show: true,
        text: '123,456',
        package1: [
            {
                name: 'iPhone7',
                price: 7199,
                count: 2
            },
            {
                name: 'iPad',
                price: 2888,
                count: 1
            }
        ],
        package2: [
            {
                name: 'apple',
                price: 3,
                count: 5
            },
            {
                name: 'banana ',
                price: 2,
                count: 10
            }
        ],
        first_name: 'Jack',
        last_name: 'Doe',
        total: 0,
        books: [
            {name: '《Vue.js实战》'},
            {name: '《JavaScript语言精粹》'},
            {name: '《JavaScript高级程序》'}
        ],
        count: 1,
        parent_message: '父组件内容',
        currentView: 'comA',
        message: 'some text'
    },
    components: {
        calculation: calculation,
        comA: {
            template: '<div>comA</div>'
        },
        comB: {
            template: '<div>comB</div>'
        },
        comC: {
            template: '<div>comC</div>'
        },
    },
    filters: {
        formatDate: function (time) {
            let date = new Date(time);
            let year = date.getFullYear();
            let month = padDate(date.getMonth() + 1);
            let day = padDate(date.getDate());
            let hours = padDate(date.getHours());
            let minutes = padDate(date.getMinutes());
            let seconds = padDate(date.getSeconds()); //将整理好的数据返回出去
            return year + '-' + month + '-' + day + " " + hours + ':' + minutes + ':' + seconds;
        }
    },
    methods: {
        handleClose: function () {
            this.show = !this.show;
        },
        handleAdd: function (count, e) {
            console.log(count);
            console.log(e);
        },
        handleGetTotal: function (total) {
            this.total = total;
        },
        handleReduce: function () {
            this.total--;
        },
        handleChangeView: function (view) {
            this.currentView = 'com' + view;
        }
    },
    computed: {
        reversedText() {
            return this.text.split(',').reverse().join(',');
        },
        prices: function () {
            let prices = 0;
            this.package1.map((item) => {
                prices += item.price * item.count;
            });
            this.package2.map((item) => {
                prices += item.price * item.count;
            });
            return prices;
        },
        fullName: function () {
            return this.first_name + ' ' + this.last_name;
        },
        firstName: {
            //getter 函数
            get: function () {
                return this.first_name;
            },
            // setter 函数
            set: function (newValue) {
                newValue && (this.first_name = newValue);
            }
        },
        lastName: {
            //getter 函数
            get: function () {
                return this.last_name;
            },
            // setter 函数
            set: function (newValue) {
                newValue && (this.last_name = newValue);
            }
        }

    },
    created: function () {

    },
    mounted: function () {
        /*  this.timer = setInterval(() => {
              this.date = new Date();
          }, 1000);*/
    },
    beforeDestroy: function () {
        this.timer && clearInterval(this.timer)
        /**/
    }
});