<template>
  <div class="header">
    <!-- <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-sub-menu index="1">
        <template #title>Mine</template>
        <div v-for="item in menuMine" :key="item.index">
          <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
        </div>
      </el-sub-menu>
    </el-menu> -->
    <ButtonPopover
      @selectOption="selectOption"
      size="large"
      classStyle="dark"
      buttonName="Mine"
      :menu="userMenu"
    />
    <el-dialog v-model="centerDialogVisible" width="30%" center>
    <span>
      Are you sure you want to log out？
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click=confrimLogOut :loading="loading">
          Confirm
        </el-button>
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
  if(key != 'login'){
    router.push('/' + key)
  }else{
    centerDialogVisible.value =true
  }
}
const confrimLogOut = ()=>{
  loading.value =true
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
  position: fixed;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  width: 100%;
  overflow: hidden;
  left: 0;
  top: 0;
  z-index: 999;
  transition: all 300ms;
}
.el-menu--horizontal {
  background-color: #26bdcf;
}
/deep/.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  color: #ffff;
  font-size: 16px;
  font-weight: bolder;
  &:hover {
    border-radius: 2px;
    background-color: #2f3542;
    .el-sub-menu__title {
      color: #67c23a;
    }
  }
  // &is-active {
  //   border-bottom: 2px solid #2f3542;
  // }
}
// /deep/.el-menu--horizontal > .el-sub-menu:hover .el-sub-menu__title {
//   c
//   &:hover {
//     background-color: #e1f3d8;
//   }
// }
</style>
