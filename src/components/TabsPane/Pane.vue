<template>
  <transition name="pane">
    <div class="pane" v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
/**
 * @description 标签页嵌套的组件，标签逻辑都放在 tabs 组件中
 * @param {String} name pane 的标识
 * @param {String} label 标签名
 * @param {Boolean} closable 是否关闭 pane 的标识
 */
export default {
  name: 'pane',
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    updateNav() {
      // 创建、更新标签
      this.$parent.updateNav();
    },
  },
  watch: {
    // 监听更新标签
    label() {
      this.updateNav();
    },
    name() {
      this.updateNav();
    },
    closable() {
      this.updateNav();
    }
  },
  mounted() {
    // 创建标签
    this.updateNav();
  },
};
</script>

<style lang="scss">
.pane {
  position: absolute;
  width: 100%;
}
.pane-enter {
  transform: translateX(-50px);
  opacity: 0;
}
.pane-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.pane-enter-active, .pane-leave-active {
  transition: all .5s;
}
</style>

