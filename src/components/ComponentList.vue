<template>
  <div class="list">
    <ul class="ul">
      <li class="li">
        <h2>数字输入框组件</h2>
        <input-number v-model="value1" :max="10" :min="-10" :step="2"></input-number>
      </li>
      <li class="li">
        <h2>标签页组件</h2>
        <tabs-pane></tabs-pane>
      </li>
    </ul>
  </div>
</template>

<script>
import InputNumber from './InputNumber';
import TabsPane from './TabsPane/TabsPane';

export default {
  name: 'component-list',
  components: {
    InputNumber,
    TabsPane,
  },
  data() {
    return {
      value1: 5,
    };
  },
};
</script>

<style lang="scss">
.list {
  & .ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>


