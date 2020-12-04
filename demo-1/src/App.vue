<template>
  <div id="app">
    <div>
      {{count}}
    </div>
    <div>
      <button @click="$store.commit('increament')">++</button>
    </div>
    <div>
      <button @click="$store.dispatch('increament')">++</button>
    </div>
    <div>
      {{$store.getters.doubleCount}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style>

</style>
