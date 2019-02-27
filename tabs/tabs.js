Vue.component('tabs', {
    name: 'tabs',
    template: '\
    <div class="tabs">\
        <div class="tabs-bar">\
            <div v-for="(item, index) in navList" \
            :class="tabCls(item)"\
            @click="handleChange(index)">\
                {{ item.label }}\
                <span v-if="item.closable" @click.stop="deleteNavList(index,$event)">\
                    X\
                </span>\
            </div>\
        </div>\
        <div class="tabs-content">\
            <!--这里的slot就是嵌套的pane-->\
            <slot></slot>\
        </div>\
    </div>',
    data: function () {
        return {
            /*用于渲染tabs的标题*/
            navList: [],
            /* 因为不能修改value，所以复制一份自己维护 */
            currentValue: this.value
        }
    },
    props: {
        value: {
            type: [String, Number]
        }
    },
    methods: {
        getTabs() {
            return this.$children.filter(item => {
                return item.$options.name === 'pane';
            });
        },
        updateNav() {
            this.navList = [];
            this.getTabs().map((pane, index) => {
                this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                });
                !pane.name && (pane.name = index);
                index === 0 && !this.currentValue ? this.currentValue = pane.name || index : '';
            });
            this.updateStatus();
        },
        updateStatus() {
            let tabs = this.getTabs();
            tabs.forEach((tab) => {
                return tab.show = tab.name === this.currentValue;
            });
        },
        tabCls(item) {
            return ['tabs-tab', {
                'tabs-tab-active': item.name === this.currentValue
            }]
        },
        handleChange(index) {
            let nav = this.navList[index];
            let name = nav.name;
            this.currentValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        },
        deleteNavList(index, event) {
            this.navList.splice(index,1);
            this.navList.length ? this.currentValue = this.navList[0]['name'] : this.currentValue = '';
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        currentValue() {
            this.updateStatus();
        }
    }
});