<template>
  <div class="register-wrap">
    <Title text="REGISTER" className="register" />
    <div class="register-main">
      <el-form :model="registerParams" :rules="rules" ref="registerFormRef" class="register-form">
        <el-form-item label="username" prop="username">
          <el-input v-model="registerParams.username" placeholder="username"> </el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input
            v-model="registerParams.password"
            placeholder="password"
            type="password"
            show-password
          >
            <template v-slot:error="{ error }">
              <div class="error-message">{{ error }}</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            v-model="registerParams.checkPass"
            type="password"
            autocomplete="off"
            show-password
          />
        </el-form-item>
        <el-form-item prop="email" label="Email">
          <el-input v-model="registerParams.email" />
        </el-form-item>
        <el-form-item prop="captche" label="Captche">
          <el-input v-model="registerParams.captche" />
          <el-button type="primary" @click="getCaptche">Get captche</el-button>
        </el-form-item>

          <el-button :loading="loading" type="primary" @click="submitForm(registerFormRef)">Sign up</el-button>

      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Title from '../components/CommonTitle.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { throttle } from 'lodash';
const loading = ref(false)
const registerParams = reactive({
  username: '',
  password: '',
  checkPass: '',
  email: '',
  captche: ''
})
const registerFormRef = ref<FormInstance>()
const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== registerParams.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
// 表单验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: 'Please input your nickname', trigger: 'blur' },
    { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' },
    {
      pattern: /^[A-Za-z0-9]*$/,
      message: 'The nickname can noly contain digits and letters'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input your password!',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
      message: 'The password must contain digits, letters, and special symbols@#$%^&+=!'
    },
    { max: 20, message: 'Maximum of 20 characters' },
    { min: 8, message: 'At least 8 characters' }
  ],
  checkPass: [{ validator: validatePass, trigger: 'blur', required: true }],
  email: [
    {
      required: true,
      message: 'Please input email address',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change']
    }
  ],
  captche: [
    { required: true },
    { max: 6, message: 'Maximum of 6 characters' },
    { min: 6, message: 'At least 6 characters' }
  ]
})
// 验证码方法
const getCaptche = () => {
  console.log(registerParams.captche)
}
// 提交表单
const submitForm = throttle((formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('registerParams!', registerParams)
      setTimeout(() => {
        // 假设请求成功
        loading.value = false;
        // 其他登录成功后的处理逻辑
      }, 2000);
    } else {
      console.log('error submit!')
      return false
    }
  })
},1000)
</script>

<style scoped lang="less">
.register-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.register-main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: #bae0ff 1px solid;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  height: 60vh;
  width: 80vh;
  min-height: 545px;
  min-width: 726px;
  margin-top: 10vh;
  border-radius: 0 5vw 0 5vw;
  background: linear-gradient(to right, #d6e4ff, #efdbff, #b5f5ec, #f6ffed);
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
  .register-form {
    display: flex;
    flex-direction: column;
    /deep/.el-form-item__label {
      width: 100px;
    }
  }
  /deep/.el-form-item__content {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    justify-content: center;
  }
  /deep/.el-form-item__label {
    font-size: 16px;
  }
  /deep/.el-form-item__error {
    font-size: 16px;
  }
}
</style>
