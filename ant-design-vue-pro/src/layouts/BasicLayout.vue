<template>
  <div>
      <Header></Header>
      <SliderMenu></SliderMenu>
      <router-view></router-view>
      <Footer/>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import SliderMenu from './SliderMenu'
export default {
    components: {
        Header,
        Footer,
        SliderMenu
    }
}
</script>

<style>

</style>