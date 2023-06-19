<template>
  <div class="manage">
    <CommonHeader />
    <div class="manage__body"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.manage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.manage__body {
  margin-top: 4px;
  width: 80%;
  height: calc(100vh - 54px);
  background-color: #ffff;
}
</style>
