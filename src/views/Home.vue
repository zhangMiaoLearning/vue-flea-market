<template>
  
    <CommonHeader />
    <div>
        <div>
            <el-input v-model="input" placeholder="Please input" clearable />
        </div>
        <div>
            标签筛选
        </div>
        <div>
            <ProductCard />
        </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
</script>

<style scoped>

</style>
