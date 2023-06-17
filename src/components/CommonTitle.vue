<template>
  <div :class="classObject">
    <div class="text">{{ props.text }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  className: string
}>()
const classObject = computed(() => {
  return {
    'common-styling': true,
    register: props.className === 'register',
    login: props.className === 'login'
  }
})
</script>

<style scoped lang="less">
.common-styling {
  height: 20vw;
  width: 100vw;
  margin-top: -10vw;
  border-radius: 0 0 50% 50%;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 80px;
  font-weight: bolder;
  text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.1);
  color: white;
}
.text {
  margin-bottom: 5vh;
}
.register {
  background: linear-gradient(to right, #d3adf7, #87e8de, #eaff8f);
  background-size: 400% 400%;
  animation: float 8s infinite;
  @keyframes float {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
.login {
  background: linear-gradient(to right, #26bdcf, #36cfc9, #93c6f2);
  background-size: 400% 400%;
  animation: float 8s infinite;
  @keyframes float {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>
