<script setup name="App" lang="ts">
import messageApi from './message-api.vue'
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <message-api></message-api>
    </n-dialog-provider>
  </n-message-provider>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <router-view> </router-view>
  </n-config-provider>
</template>

<style>
#app {
  font-family: benton-sans, Helvetica, 'Sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
</style>
