function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    template: '<div class="input-number">' +
    '<input type="text" :value="currentValue" @change="handleChange" @keyup="handleKeyChange">' +
    '<button @click="handleReduce" :disabled="currentValue <= min">-{{ this.step }}</button>' +
    '<button @click="handleIncrease" :disabled="currentValue >= max">+{{ this.step }}</button>' +
    '</div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: Number,
            default: 0
        },
    },
    data: function () {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue(val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        value(val) {
            this.currentValue = val;
        }
    },
    methods: {
        handleReduce() {
            this.currentValue > this.min && this.updateValue(this.currentValue -= this.step);
        },
        handleIncrease() {
            this.currentValue < this.max && this.updateValue(this.currentValue += this.step);
        },
        handleChange(e) {
            this.updateValue(e.target.value.trim(), event);
        },
        handleKeyChange(e) {
            let key_code = e.keyCode;
            if(key_code === 38){
                this.handleIncrease();
            }else if(key_code === 40){
                this.handleReduce();
            }
        },
        updateValue(val, event) {
            val = typeof val === 'string' ? Number(val) : val;
            if (isValueNumber(val)) {
                val > this.max && (val = this.max);
                val < this.min && (val = this.min);
                this.currentValue = val;
            } else {
                event.target.value = this.currentValue;
            }

        }
    },
    mounted() {
        this.updateValue(this.value);
    }
});

