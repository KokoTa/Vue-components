<template>
  <div class="tabs">
    <div class="tabs-bar">
      <div
        v-for="(item, index) in navList"
        :key="index"
        :class="tabClass(item)"
        @click="handleChange(index)">
          {{ item.label }}
          <span
            v-if="item.closable"
            class="delete"
            @click.stop="deletePane(item)">
            x
          </span>
      </div>
    </div>
    <div class="tabs-content">
      <!-- 这里放置 pane 组件 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * @description 标签页组件
 * @param {Number, String} value 默认选中的标签
 */

export default {
  name: 'tabs',
  props: {
    // 配合 v-model 使用
    value: {
      type: [Number, String],
    },
  },
  data() {
    return {
      // 选中的tab
      currentValue: this.value,
      // tabs 集合
      navList: [],
    };
  },
  methods: {
    getTabs() {
      // 遍历子组件，拿到所有 pane 组件
      return this.$children.filter(item => {
        return item.$options.name === 'pane';
      });
    },
    updateNav() {
      // 此方法由 pane 组件触发。用于创建、更新标签
      console.log('pane 触发 updateNav');

      this.navList = [];

      this.getTabs().forEach((pane, index) => {
        // 如果没有给 pane 设置标识，就用索引作为标识
        if (!pane.name) pane.name = index;

        // 通过 pane 组件的信息得到标签集合
        this.navList.push({
          label: pane.label,
          name: pane.name,
          closable: pane.closable,
        });

        // 如果没有"当前选择值"，则默认选中第一个 pane
        if (!this.currentValue) {
          if (index === 0) {
            this.currentValue = pane.name;
          }
        }
      });

      this.upadateStatus();
    },
    upadateStatus() {
      // 设置 pane 的显示
      const tabs = this.getTabs();
      tabs.forEach(tab => {
        return (tab.show = tab.name === this.currentValue);
      });
    },
    tabClass(item) {
      // 给选中的 tab 添加额外样式
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue,
        },
      ];
    },
    handleChange(index) {
      // 点击 tab 触发操作
      const nav = this.navList[index];
      const name = nav.name;
      // 改变当前选择值，触发 watch
      this.currentValue = name;
      // 更新 value
      this.$emit('input', name);
      // 触发一个自定义事件
      this.$emit('on-click', name);
    },
    deletePane(pane) {
      // 设置 pane 的关闭
      const tabs = this.getTabs();
      tabs.forEach(tab => {
        if (tab.name === pane.name) {
          tab.show = false;
        }
      });
    },
  },
  watch: {
    value(val) {
      // value 值有可能通过外部改变，因此要监听
      // 比如我外部修改了 value，但是没有监听，那么 currentValue 就还是旧值，也就无法设置 pane 的显示
      this.currentValue = val;
    },
    currentValue(val) {
      // 选中值变化时更新 pane 显示
      this.upadateStatus();
    },
  },
};
</script>

<style lang="scss">
[v-clock] {
  display: none;
}
.tabs-bar:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  margin-top: -1px;
  background: gray;
}
.tabs-tab {
  display: inline-block;
  padding: 4px 16px;
  margin-right: 6px;
  background: #fff;
  border: 1px solid gray;
  cursor: pointer;
  position: relative;
  & .delete {
    color: red;
    border: 1px solid red;
    border-radius: 50%;
    display: inline-block;
    line-height: 20px;
    width: 20px;
    &:hover {
      background: red;
      color: white;
    }
  }
}
.tabs-tab-active {
  color: #3399ff;
  border-top: 1px solid #3399ff;
  border-bottom: 1px solid #fff;
}
.tabs-tab-active:before {
  content: '';
  display: block;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.tabs-content {
  padding: 10px 0;
}
</style>
