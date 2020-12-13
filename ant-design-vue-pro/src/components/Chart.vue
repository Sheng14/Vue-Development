<template>
  <div ref="chartDom"></div>
</template>

<script>
/* 
import echarts from 'echarts'; 直接import会报init是undefined的错！！！如下：
Error in mounted hook: "TypeError: Cannot read property 'init' of undefined"
TypeError: Cannot read property 'init' of undefined
*/
let echarts = require('echarts'); // 必须以这种方式导入echarts
import { addListener, removeListener } from 'resize-detector'; // 引入监听容器变化的函数
import debounce from 'lodash/debounce'; // 引入防抖函数
export default { 
  props: { // 接收父组件传来的图表值
      option: {
          type: Object,
          default: () =>{}
      }
  },
  watch: { // 对变化的值监听
    option(val) {
        this.Chart.setOption(val);
    }
   /* option: {
        handler(val) {
            this.Chart.setOption(val);
        },
        deep: true
    }*/
  },
  created () {
      this.resize = debounce(this.resize, 300); // 对容器变化调用的resize做防抖
  },
  mounted () {
      this.renderChart(); // 初始化图表
      addListener(this.$refs.chartDom, this.resize); // 给图表添加监听容器事件
  },
  beforeDestroy () { // 关闭时记得销毁事件和图表
      removeListener(this.$refs.chartDom, this.resize);
      this.Chart.dispose();
      this.Chart = null;
  },
  methods: {
      resize () {
          this.Chart.resize()
      },
      renderChart () {
        // 基于准备好的dom，初始化echarts实例
        this.Chart = echarts.init(this.$refs.chartDom);
        // 使用刚指定的配置项和数据显示图表。
        this.Chart.setOption(this.option);
      }
  }
}
</script>

<style>

</style>
