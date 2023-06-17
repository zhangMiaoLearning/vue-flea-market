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
   <ButtonPopover @selectOption="selectOption" size="large" classStyle="dark" buttonName="click" :menu="userMenu"/>
   <ButtonPopover @selectOption="selectOption" size="small" classStyle="dark" buttonName="click" :menu="userMenu2"/>
  </div>
</template>

<script setup lang="ts">
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const menuMine = [
//   { index: '1-1', name: 'Setting' },
//   { index: '1-2', name: 'Sign out' }
// ]
const userMenu = [{key:"1",value:"123"},{key:"2",value:"456"}]
const userMenu2 = [{key:"111",value:"111"},{key:"222",value:"222"}]
const selectOption = (key:string,value:string) =>{
  console.log(key,value);
  
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
