Vue.directive('clickoutside', {
    bind(el, binding, vnode) {
        function documentHandler(e) {
            !el.contains(e.target) && binding.expression && binding.value(e);
        }

        function keyUp(e) {
            el.contains(e.target) && (e.keyCode === 27 || (binding.modifiers && binding.modifiers.esc)) && binding.expression && binding.value(e);
        }

        el._vueClickOutside_ = documentHandler;
        el._vueKeyUp_ = keyUp;
        document.addEventListener('click', documentHandler);
        document.addEventListener('keyup', keyUp);
    },
    update(el,binding){
        // el.remove();
    },
    unbind(el, binding) {
        document.removeEventListener('click', el._vueClickOutside_);
        document.removeEventListener('keyup', el._vueKeyUp_);
        delete  el._vueClickOutside_;
        delete  el._vueKeyUp_;
    }
});