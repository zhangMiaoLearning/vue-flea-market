<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loading from './components/LoadingPage.vue'
import { useLoadingStore } from './stores';
const store = useLoadingStore()
const loading = store.$state.isLoading
console.log('app',loading);

</script>

<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div v-if="!loading">
    <RouterView />
  </div>
</template>

<style lang="less"></style>
