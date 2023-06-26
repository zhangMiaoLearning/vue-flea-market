<template>
  <el-result title="404" sub-title="Sorry, request error">
    <template #icon>
      <el-empty description="啊哦！找不到页面啦" />
    </template>
    <template #extra>
      <NavigationButton
        size="large"
        classStyle="primary"
        buttonName="返回主页"
        @clickNavigationButton="backHome"
      />
    </template>
  </el-result>
</template>

<script setup lang="ts">
const router = useRouter()
const backHome = () => {
  router.push('./home')
}
</script>

<style scoped></style>
