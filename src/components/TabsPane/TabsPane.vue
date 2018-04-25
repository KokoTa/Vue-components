<template>
  <div class="tabs-pane">
    <tabs v-model="activeKey">
      <pane label="标签一" name="1">
        标签一内容
      </pane>
      <pane label="标签二" name="2">
        标签二内容
      </pane>
      <pane label="标签三" name="3" :closable="true">
        标签三内容
      </pane>
    </tabs>
  </div>
</template>

<script>
/**
 * @description 组件思想：
 * 1. pane 载入后调用 tabs 的方法来创建 tab
 * 2. pane 的状态变动都会触发 tabs 的更新操作
 * 3. activeKey 的变动会触发 tabs 的更新操作和 pane 的显示操作
 */
import Tabs from './Tabs';
import Pane from './Pane';

export default {
  name: 'tabs-pane',
  components: {
    Tabs,
    Pane,
  },
  data() {
    return {
      activeKey: '1',
    };
  },
};
</script>

