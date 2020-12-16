<template>
  <div style="text-align: center;">
    <IconFont type="icon-yepian" style="font-size: 68px; margin-top:200px;"></IconFont>
    <div>
    <!--  <img :src="logo" />-->
    <Logo></Logo>
    </div>
  </div>
</template>

<script>
 // import logo from '../assets/biking-person.svg' // 默认引入的.svg文件会被cli自带的loader给转换成url字符串！
import Logo from '../assets/biking-person.svg' // 修改了loader后我们vue-svg-loader则会把.svg文件解析成一个个函数式组件！
export default {
  components: {
    Logo
  }
  /*data () {
    return {
      logo
    }
  }*/

}
</script>

<style>

</style>