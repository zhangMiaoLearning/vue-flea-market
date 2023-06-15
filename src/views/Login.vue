<template>
  <div class="login-wrap">
    <Title text="LOGIN" className="login" />
    <div class="login-main">
      <el-form :model="loginParms" :rules="rules" ref="loginFormRef" class="login-main__content">
        <el-form-item prop="username">
          <el-input v-model="loginParms.username" placeholder="username" class="login-main__input">
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
            class="login-main__input"
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
          class="login-main__button"
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
import Title from '../components/CommonTitle.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Key } from '@element-plus/icons-vue'
const loginParms = reactive({
  username: '',
  password: ''
})
const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [{ required: true, message: 'Please input your nickname', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input your password!', trigger: 'blur' }]
})
const loading = ref(false)
// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  console.log('loginParms!', loginParms)
  loading.value = true;
      setTimeout(() => {
        // 假设请求成功
        loading.value = false;
        // 其他登录成功后的处理逻辑
      }, 2000);
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
  &__content {
    display: flex;
    flex-direction: column;
  }
  &__input {
    width: 250px;
  }
  &__button {
    width: 250px;
  }
}
a {
  font-weight: bolder;
  font-size: 16px;
  color: #1890ff;
}
</style>
