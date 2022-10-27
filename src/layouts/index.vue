<script setup name="layout" lang="ts">
import { Header, Footer } from './components'
import App from '@/App.vue'
</script>
<template>
  <Header></Header>
  <App></App>
  <Footer></Footer>
  <!-- <div class="min-h-screen flex flex-col justify-between">
    <Header></Header>
    <App class="h-full w-full flex flex-col"></App>
    <Footer></Footer>
  </div> -->
</template>
