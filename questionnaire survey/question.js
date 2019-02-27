Vue.component('question', {
    template: '\
    <div class="container">\
    <slot></slot>\
    <button @click="nextClick">下一步</button>\
    <button @click="submitClick">提交</button>\
    <button @click="prevClick">上一步</button>\
    <button @click="resetClick">重置</button>\
    </div>',
    data: function () {
        return {}
    }
});