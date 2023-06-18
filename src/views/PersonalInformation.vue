<template>
  <div class="information">
    <CommonHeader />
    <div class="information__body">
      <InformationList :data="data" title="personal information" @sumbitEdit="sumbit" />
      <InformationList :data="data2" title="test" @sumbitEdit="sumbit2"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = [
  { key: "name", label: 'name', value: 'username',isEdit:true },
  { key: "email", label: 'email', value: '1234@qq.com',isEdit:false },
  { key: "user", label: 'personal information', value: '1234@qq.com',isEdit:true },
  { key: "4", label: 'email', value: '1234@qq.com',isEdit:false },
  { key: "5", label: 'email', value: '1234@qq.com',isEdit:true },
]
const data2 = [
  { key: "1234", label: 'asdgfa', value: 'asdf',isEdit:false },
  { key: "jsdkgjl", label: 'asfdg', value: 'asdf@qq.com',isEdit:true },
  { key: "asdg", label: '334 information', value: '1234@qq.com',isEdit:true },
  { key: "4", label: '45', value: '1234@gfadgqq.com',isEdit:false },
  { key: "5", label: 'dsf', value: '1234@sdf.com',isEdit:true },
]
const sumbit = (newList:any)=>{
  console.log(newList);
}
const sumbit2 = (newList:any)=>{
  console.log(newList);
}

</script>

<style scoped lang="less">
.information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.information__body {
  margin-top: 40px;
  width: 80%;
}
</style>
