<template>
  <div class="information">
    <CommonHeader />
    <div class="information__body">
      <div class="information__list">
        <InformationList :data="data" title="personal information" @sumbitEdit="sumbit" />
      </div>
      <div class="information__password">
        <div class="information__password__title">change password</div>
        <div class="information__password__content">
          <el-form
            :model="changePasswordParams"
            :rules="rules"
            ref="changePasswordFormRef"
            class="information__password__form"
          >
            <el-form-item label="password:" prop="password">
              <el-input
                v-model="changePasswordParams.password"
                placeholder="password"
                type="password"
                show-password
              >
                <template v-slot:error="{ error }">
                  <div class="error-message">{{ error }}</div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="confirm:" prop="checkPass">
              <el-input
                v-model="changePasswordParams.checkPass"
                type="password"
                autocomplete="off"
                show-password
              />
            </el-form-item>
            <el-form-item prop="captche" label="please click to get email captcha:">
              <button class="information__password__button small" @click.prevent="getCaptche">
              Get captcha
            </button>
            </el-form-item>
            <el-form-item prop="captche" label="captche:">
              <el-input v-model="changePasswordParams.captche" />
            </el-form-item>
          </el-form>
        </div>
        <div class="information__password__footer">
          <button
            class="information__password__button large"
            :loading="loading"
            @click="submitForm(changePasswordFormRef)"
          >
            sumbit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = [
  { key: 'name', label: 'name', value: 'username', isEdit: true },
  { key: 'email', label: 'email', value: '1234@qq.com', isEdit: false },
  { key: 'user', label: 'personal information', value: '1234@qq.com', isEdit: true },
  { key: '4', label: 'email', value: '1234@qq.com', isEdit: false },
  { key: '5', label: 'email', value: '1234@qq.com', isEdit: true }
]
const sumbit = (newList: any) => {
  console.log(newList)
}
const loading = ref(false)
const changePasswordParams = reactive({
  password: '',
  checkPass: '',
  captche: ''
})
import type { FormInstance, FormRules } from 'element-plus'
import { throttle } from 'lodash'
const changePasswordFormRef = ref<FormInstance>()
const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== changePasswordParams.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}
// 表单验证规则
const rules = reactive<FormRules>({
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
  captche: [
    { required: true },
    { max: 6, message: 'Maximum of 6 characters' },
    { min: 6, message: 'At least 6 characters' }
  ]
})
// 验证码方法
const getCaptche = throttle(() => {
  console.log(1);
  console.log(changePasswordParams.captche)
})
// 提交表单
const submitForm = throttle((formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      formEl.resetFields()
      console.log('registerParams!', changePasswordParams)
      setTimeout(() => {
        // 假设请求成功
        loading.value = false
        // 其他登录成功后的处理逻辑
      }, 2000)
    } else {
      console.log('error submit!')
      return false
    }
  })
}, 1000)
</script>

<style scoped lang="less">
.information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.information__body {
  width: 80%;
}
.information__list {
  margin-top: 40px;
}
.information__password {
  margin-top: 40px;

  &__title {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  &__content {
    border-radius: 5px;
    padding: 10px;
    display: flex;
    min-width: 800px;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
  &__form {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    /deep/.el-form-item {
      width: 50%;
    }
    /deep/.el-form-item__label {
      font-weight: bolder;
      color: black;
    }
    /deep/.el-input__wrapper {
      height: 23px;
      border-radius: 2px;
      border: 0.5px solid black;
      flex-grow: 0;
    }
    /deep/.el-input__inner{
      color:black
    }
  }
  &__footer {
    display: flex;
    margin-top: 10px;
    gap: 20px;
    justify-content: flex-end;
  }
  &__button {
    vertical-align: middle;
    text-align: center;
    color: #ffffff;
    box-shadow: 0px 2px 4px rgba(95, 95, 95, 0.5);
    border-radius: 5px;
    background-color: #26bdcf;
    cursor: pointer;
    border: 0;
    &:active {
      opacity: 0.8;
    }
  }
}
.large {
  width: 100px;
  height: 40px;
  padding: 0 10px;
}
.small {
  padding: 0 10px;
  height: 30px;
}
</style>
