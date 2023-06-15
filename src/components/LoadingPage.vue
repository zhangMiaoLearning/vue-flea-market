<template>
  <div v-if="store.isLoading">
    loading
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '../stores/index'
const store = useLoadingStore()
console.log(store.isLoading);

</script>

<style scoped>

</style>