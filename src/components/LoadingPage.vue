<template>
  <div v-if="store.isLoading" class="loading">
    loading
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '../stores/index'
const store = useLoadingStore()
console.log(store.isLoading);

</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
</style>