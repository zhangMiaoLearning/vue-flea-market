<template>
  <div>
    <el-popover placement="bottom" trigger="click" :show-arrow="false" @show="active" @hide="close">
      <template #reference>
        <el-button :icon="iconName" :class="buttonClassName(props.size)">{{
          props.buttonName
        }}</el-button>
        <el-icon><ArrowDownBold /></el-icon>
      </template>
      <div v-for="item in props.menu" :key="item.key" :class="itemClassName(props.size)">
        <div @click="handleSelect(item.key, item.value)">{{ item.value }}</div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'
const props = defineProps({
  classStyle: {
    type: String,
    default: 'dark'
  },
  size: {
    type: String,
    default: 'medium'
  },
  buttonName: {
    type: String,
    default: 'Submit'
  },
  menu: {
    type: Array as PropType<{ key: string; value: string }[]>,
    default: () => []
  }
})
const isActive = ref(false)
const iconName = computed(() => (isActive.value ? ArrowUpBold : ArrowDownBold))
const activeClass = computed(() => (isActive.value ? props.classStyle + '-active' : props.classStyle))
const buttonClassName = computed(() => (size: string) => 'button-' + size + ' ' + activeClass.value)
const itemClassName = computed(() => (size: string) => 'item-' + size + ' ' + 'item')
const emit = defineEmits(['selectOption'])
const handleSelect = (key: string, value: string) => {
  emit('selectOption', key, value)
}
const active = () => {
  isActive.value = true
}
const close = () => {
  isActive.value = false
}
</script>
<style scoped lang="less">
.item {
  display: flex;
  justify-content: center;
  border-radius: 2%;
  cursor: pointer;
  &:hover {
    background-color: rgba(38, 202, 220, 0.2);
    color: #26bdcf;
  }
  &:active {
    opacity: 0.8;
  }
}
.item-large {
  font-size: 14px;
  padding: 5px 0;
}
.item-middle {
  font-size: 12px;
  padding: 5px 0;
}
.item-small {
  font-size: 12px;
  padding: 5px 0;
}
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
  background-color: #409eff;
  color: #ffff;
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
