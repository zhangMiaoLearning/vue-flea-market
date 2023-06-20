<template>
  <div class="list">
    <div class="list__title">
      <div class="list__title__text">{{ props.title }}</div>
      <button class="list__button" @click="handleClick">Edit</button>
    </div>
    <div class="list__body">
      <div v-for="item in listData" :key="item.key" class="list__item">
        <div class="list__item__label">{{ item.label }}:</div>
        <div v-show="isEdit && item.isEdit">
          <input class="list__item__input" v-model="item.value" />
        </div>
        <div v-show="!(isEdit && item.isEdit)">{{ item.value }}</div>
      </div>
    </div>
    <div v-show="isEdit" class="list__footer">
      <button class="list__footer__button cancle" @click="handleCancle">cancle</button>
      <button class="list__footer__button sumbit" @click="handleSumbit">sumbit</button>
    </div>
  </div>

  <el-dialog v-model="centerDialogVisible" width="30%" center>
    <span> Do want to change your information </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">Cancel</el-button>
        <el-button type="primary" @click="confrim" :loading="loading"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const centerDialogVisible = ref(false)
const loading = ref(false)
const props = defineProps<{
  title: string
  data: { key: string; label: string; value: string; isEdit: boolean }[]
}>()
let listData = JSON.parse(JSON.stringify(props.data))
const isEdit = ref(false)
const emit = defineEmits(['sumbitEdit'])
const handleClick = () => {
  isEdit.value = true
}

const handleSumbit = () => {
  centerDialogVisible.value = true
}
const handleCancle = () => {
  listData = JSON.parse(JSON.stringify(props.data))
  isEdit.value = false
  centerDialogVisible.value = false
}
const confrim = () => {
  emit('sumbitEdit', listData)
  isEdit.value = false
  centerDialogVisible.value = false
}
const cancle = () => {
  centerDialogVisible.value = false
  isEdit.value = false
}
</script>

<style scoped lang="less">
.list {
  min-width: 100%;
}
.list__title {
  width: 100%;
  height: 40px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  &__text {
    font-size: 25px;
    font-weight: 500;
  }
}
.list__button {
  background-color: #cf2969;
  width: 100px;
  height: 40px;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  box-shadow: 0px 2px 4px rgba(95, 95, 95, 0.5);
  border-radius: 5px;
  cursor: pointer;
  border: 0;
  &:active {
    opacity: 0.8;
  }
}
.list__body {
  border-radius: 5px;
  padding: 10px;
  display: flex;
  min-width: 800px;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.list__item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 50%;
  padding: 10px 0;
  align-items: center;
  &__label {
    font-weight: bolder;
    line-height: 40px;
  }
  &__input {
    font-size: 16px;
  }
}
.list__footer {
  display: flex;
  margin-top: 10px;
  gap: 20px;
  justify-content: flex-end;
}
.list__footer__button {
  width: 100px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  text-align: center;
  color: #ffffff;
  box-shadow: 0px 2px 4px rgba(95, 95, 95, 0.5);
  border-radius: 5px;
  cursor: pointer;
  border: 0;
  &:active {
    opacity: 0.8;
  }
}
.cancle {
  background-color: #909797;
}
.sumbit {
  background-color: #26bdcf;
}
</style>
