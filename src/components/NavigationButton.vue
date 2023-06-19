<template>
  <div>
    <el-button :class="buttonClassName(props.size)" @click="handleClick">{{
          props.buttonName
        }}</el-button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  classStyle: string
  size: string
  buttonName: string
}>()
const buttonClassName = computed(() => (size: string) => 'button-' + size +' ' + props.classStyle)
const emit = defineEmits(['clickNavigationButton'])
const handleClick = () => {
  emit('clickNavigationButton')
}
</script>

<style scoped lang="less">
.button-large {
  border-radius: 10%;
  font-size: 16px;
  min-width: 80px;
  min-height: 40px;
}
.button-middle {
  border-radius: 10%;
  font-size: 14px;
  min-width: 60px;
  min-height: 30px;
}
.button-small {
  border-radius: 10%;
  font-size: 12px;
  min-width: 30px;
  min-height: 20px;
}
.primary {
  background-color: #26bdcf;
  color: #ffff;
  border: 0;
  &:hover {
    background-color: #1a95a3;
  }
  &:active {
    opacity: 0.6;
  }
}
.primary-active {
  background-color: #26bdcf;
}
.dark {
  background-color: rgba(38, 202, 220, 0);
  color: #ffff;
  border: 0;
  &:hover {
    background-color: #2f3542;
  }
  &:active {
    opacity: 0.6;
  }
}
.dark-active {
  background-color: #2f3542;
  color: #ffff;
  border: 0;
}
</style>