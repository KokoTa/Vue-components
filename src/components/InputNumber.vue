<template>
  <div class="input-number">
    <input 
      type="text"
      :value="inputValue"
      @change="handleChange"
      @keydown.down="handleDown"
      @keydown.up="handleUp">
    <button
      @click="handleDown"
      :disabled="inputValue <= min">
      -
    </button>
    <button
      @click="handleUp"
      :disabled="inputValue >= max">
      +
    </button>
  </div>
</template>

<script>
/**
 * @description 数字输入框组件
 * @param {Number} max 最大数
 * @param {Number} min 最小数
 * @param {Number} value 默认值
 * @param {Number} step 步伐值
 */
export default {
  name: 'input-number',
  props: {
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    value: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  methods: {
    updateValue(val) {
      // 更新inputValue
      if (val > this.max) val = this.max;
      if (val < this.min) val = this.min;
      this.inputValue = val;
    },
    handleDown() {
      // 减
      if (this.inputValue <= this.min) return;
      this.inputValue -= this.step;
    },
    handleUp() {
      // 增
      if (this.inputValue >= this.max) return;
      this.inputValue += this.step;
    },
    handleChange(e) {
      // 手动输入时
      let val = e.target.value.trim(); // 值是一个字符串
      const max = this.max;
      const min = this.min;

      if (this.isValueNumber(val)) {
        val = Number(val);
        this.inputValue = val;

        if (val > max) {
          this.inputValue = max;
        } else if (val < min) {
          this.inputValue = min;
        }
      } else {
        e.target.value = this.inputValue;
      }
    },
    isValueNumber(val) {
      // 判断是否合法数值
      // 1. 匹配正负浮点数
      // 2. 匹配正负整数
      // 3. 匹配正负0
      // PS：正则表达式中不能存在空格
      return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(val + '');
    },
  },
  watch: {
    value(val) {
      // 外值变时内值变
      this.updateValue(val);
    },
    inputValue(val) {
      // 内值变时外值变
      this.$emit('input', val);
      this.$emit('on-change', val);
    },
  },
  mounted() {
    this.updateValue(this.value);
  },
};
</script>

