<template>
  <div id="app">
    <div id="nav">
      <a-button>按钮</a-button>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less"></style>
