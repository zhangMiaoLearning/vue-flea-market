<template>
  <div class="header">
    <ButtonPopover
      @selectOption="selectOption"
      size="large"
      classStyle="dark"
      buttonName="Mine"
      :menu="userMenu"
    />
    <el-dialog v-model="centerDialogVisible" width="30%" center>
      <span> Do you want to log out? </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confrimLogOut" :loading="loading"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const userMenu = [
  { key: 'account', value: 'Setting' },
  { key: 'login', value: 'log out' }
]
const router = useRouter()
const centerDialogVisible = ref(false)
const loading = ref(false)
const selectOption = (key: string, value: string) => {
  console.log(key, value)
  if (key != 'login') {
    router.push('/' + key)
  } else {
    centerDialogVisible.value = true
  }
}
const confrimLogOut = () => {
  loading.value = true
  router.push('/login')
}
</script>

<style scoped lang="less">
.header {
  background-color: #26bdcf;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  width: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  transition: all 300ms;
}
.el-menu--horizontal {
  background-color: #26bdcf;
}
</style>
