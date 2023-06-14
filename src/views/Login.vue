<template>
  <div class="login-wrap">
    <Title text="LOGIN" className="login" />
    <div class="login-main">
      <el-form :model="loginParms" ref="loginFormRef" class="login-main-content">
        <el-form-item prop="username">
          <el-input
            v-model="loginParms.username"
            placeholder="username"
            class="login-main-content-input"
          >
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginParms.password"
            placeholder="password"
            type="password"
            show-password
            class="login-main-content-input"
          >
            <template #prepend>
              <el-icon>
                <Key />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button
          class="login-main-content-button"
          type="primary"
          @click="submitForm(loginFormRef)"
          :loading="loading"
          >Login
        </el-button>
      </el-form-item>
      <a href="/register">register now!</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Title from '../components/Title.vue'
import type { FormInstance } from 'element-plus'
import { User, Key } from '@element-plus/icons-vue'
const loginParms = reactive({
  username: '',
  password: ''
})
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  console.log('loginParms!', loginParms)
}

</script>

<style scoped lang="less">
.login-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.login-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: #bae0ff 1px solid;
  border-radius: 5vw 0 5vw 0;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  height: 50vh;
  width: 50vh;
  min-width: 454px;
  min-height: 454px;
  margin-top: 10vh;
  color: white;
  background: linear-gradient(to bottom right, #95de64, #36cfc9, #b7eb8f, #b37feb);
  background-size: 400% 400%;
  animation: float 10s infinite;
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
  &-content {
    display: flex;
    flex-direction: column;

    &-input {
      width: 250px;
    }
    &-button {
      width: 250px;
    }
  }
}
a {
  font-weight: bolder;
  font-size: 16px;
  color: #1890ff;
}
</style>
