<template>
  <div class="header">
    <ButtonPopover
      @selectOption="selectOption"
      size="large"
      classStyle="dark"
      buttonName="我的"
      :menu="userMenu"
    />
    <NavigationButton @clickNavigationButton="clickNavigationButton" size="large" classStyle="dark" buttonName="用户管理" />
    <el-dialog v-model="centerDialogVisible" width="30%" center>
      <span> 确定要退出吗 </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confrimLogOut" :loading="loading"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavigationButton from './NavigationButton.vue'
const userMenu = [
  { key: 'account', value: '信息设置' },
  { key: 'login', value: '退出登录' }
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
const clickNavigationButton = ()=>{
  router.push('/manage')
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
