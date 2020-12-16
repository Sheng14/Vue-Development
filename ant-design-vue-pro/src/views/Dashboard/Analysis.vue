<template>
  <div>
    {{$t('message')['app.dashboard.analysis.timeLabel']}}: 
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height: 400px;"></Chart>
  </div>
</template>

<script>
// import random from 'lodash/random' //引入随机数处理函数
import Chart from '../../components/Chart.vue' // 引入图表组件
import request from '../../utils/request' // 引入二次封装的axios请求方法
// import axios from 'axios'
export default {
  data () {
    return {
      chartOption: {}  // 定义给图表的数据
    }
  },
  components: {  
    Chart
  },
  methods: {
    getChartData () { // 请求mock中的图表数据
     // axios.get('/api/dashboard/chart', { params: { ID: 12345 } })
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: {
          ID: 12345
        }
      }).then((res) => {
          this.chartOption = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: res.data // 实际需要返回的
            }]                    
          }
        })
    }
  },
  mounted () { // 建立一个定时器，不断修改其中的值，重新赋值假装改变其结构才能触发子组件的watcher（现在不是了）
    this.getChartData()
    this.interval = setInterval(() => {
      this.getChartData()
    /*  this.chartOption.series[0].data = this.chartOption.series[0].data.map(()=>random(100)) // 改变值可以被深度监听到
      this.chartOption = {...this.chartOption} // 重新赋值假装改变了结构可以直接被监听到*/
    }, 3000)
  },
  beforeDestroy () { // 关闭的时候记得销毁定时器！
    console.log(11)
    clearInterval(this.interval)
    this.interval = null
  }
}
</script>

<style>

</style>