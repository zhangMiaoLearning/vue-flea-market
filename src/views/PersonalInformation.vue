<template>
  <div class="information">
    <CommonHeader title="设置" />
    <div class="information__body">
      <div class="information__list">
        <InformationList :data="data" title="个人信息" @sumbitEdit="sumbit" />
      </div>
      <div class="information__password">
        <div class="information__password__title">修改密码</div>
        <div class="information__password__content">
          <el-form
            :model="changePasswordParams"
            :rules="rules"
            ref="changePasswordFormRef"
            class="information__password__form"
          >
            <div class="information__password__header">
              <el-form-item label="旧密码:" prop="password">
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
              <el-form-item label="确认:" prop="checkPass">
                <el-input
                  v-model="changePasswordParams.checkPass"
                  type="password"
                  autocomplete="off"
                  show-password
                />
              </el-form-item>
            </div>
            <el-form-item prop="captche" label="captche:" class="form__item__captcha">
              <el-input v-model="changePasswordParams.captche" />
              <button class="information__password__button small" @click.prevent="getCaptche">
                获取验证码
              </button>
            </el-form-item>
          </el-form>
        </div>
        <div class="information__password__footer">
          <el-button
            @click="resetForm(changePasswordFormRef)"
            class="information__password__button large reset"
            >重置</el-button
          >
          <button
            class="information__password__button large"
            :loading="loading"
            @click="submitForm(changePasswordFormRef)"
          >
            提交
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
    callback(new Error('请再次输入密码!'))
  } else if (value !== changePasswordParams.password) {
    callback(new Error("两次输入不一致！"))
  } else {
    callback()
  }
}
// 表单验证规则
const rules = reactive<FormRules>({
  password: [
    {
      required: true,
      message: '请输入密码!',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
      message: '密码必须包含大、小写字母、数字和特殊符号@#$%^&+=!'
    },
    { max: 20, message: '最多20位' },
    { min: 8, message: '最少8位' }
  ],
  checkPass: [{ validator: validatePass, trigger: 'blur', required: true }],
  captche: [
    { required: true,message:'请输入验证码!' },
    { max: 6, message: '最多6位数字' },
    { min: 6, message: '最少6位数字' }
  ]
})
// 验证码方法
const getCaptche = throttle(() => {
  console.log(1)
  console.log(changePasswordParams.captche)
})
const resetForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}
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
    color: #606266;
  }
  &__content {
    border-radius: 5px;
    padding: 10px;
    display: flex;
    min-width: 800px;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
  &__header {
    display: flex;
    flex-wrap: wrap;
    flex-direction: raw;
  }
  &__form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    /deep/.el-form-item {
      width: 50%;
    }
    /deep/.el-form-item__label {
      font-weight: bolder;
    }
    /deep/.el-input {
      width: auto;
    }
    /deep/.el-input__wrapper {
      height: 23px;
      border-radius: 2px;
      border: 0.5px solid black;
      flex-grow: 0;
    }
    /deep/.el-input__inner {
      color: black;
    }
  }
  .form__item__captcha {
    display: flex;
    flex-direction: row;
  }
  &__footer {
    display: flex;
    margin-top: 10px;
    gap: 20px;
    justify-content: flex-end;
  }
  &__button {
    margin-left: 20px;
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
.reset {
  background-color: #84868c;
  &:hover {
    background-color: #5a5e62;
  }
}
</style>
