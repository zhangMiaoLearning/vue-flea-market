<template>
  <CommonHeader />
  <div class="title">商品上传</div>
  <div class="container">
    <div class="container__body">
      <el-form
        ref="formRef"
        :rules="rules"
        :model="form"
        label-width="120px"
        class="task-form"
        label-position="left"
      >
        <el-form-item label="商品名称:" prop="title" class="container__form__item">
          <el-input v-model="form.title" placeholder="简洁醒目的标题更吸引人哦"></el-input>
        </el-form-item>
        <el-form-item label="商品图片:" prop="photo" class="task-form-item">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="handlePreview"
            :on-change="handleAdd"
            :on-remove="handleRemove"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品标签:" prop="product_label" class="task-form-item">
          <el-checkbox-group v-model="form.product_label">
            <el-checkbox v-for="label in labels" :label="label" :key="label" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品详情:" prop="product_detail" class="task-form-item">
          <el-input
            type="textarea"
            :rows="4"
            v-model="form.product_detail"
            placeholder="请描述商品的信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元):" prop="price" class="task-form-item">
          <el-input v-model="form.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
      </el-form>
      <div class="container__form__footer">
        <el-button type="primary" @click="submitForm(formRef)" class="container__form__button"
          >发布</el-button
        >
        <el-button @click="resetForm(formRef)" class="container__form__button reset">重置</el-button>
      </div>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <el-dialog v-model="centerDialogVisible" width="30%" center>
        <span> 确定要发布该商品吗</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmUpload(formRef)" :loading="loading">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { uploadGoods } from '../api/api'
import type { UploadFile } from 'element-plus'
import { HttpStatusCode } from 'axios'
const centerDialogVisible = ref(false)
const loading = ref(false)
const form = reactive({
  title: '',
  product_label: [],
  product_detail: '',
  price: 0
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const rules: FormRules = {
  title: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入商品价格', trigger: 'blur' },
    {
      pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
      message: '请输入数字！'
    }
  ]
}
const labels = ['全新', '九成新', '无包装', '吊牌在', '不砍价', '可小刀']
const fileList = [] as UploadFile[]
const formRef = ref<FormInstance>()
const handleRemove = (file: UploadFile) => {
  fileList.forEach((item, index) => {
    if (item.uid == file.uid) {
      fileList.splice(index)
    }
  })
}
const handlePreview = (file: UploadFile) => {
  console.log(file, 'file')
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
const handleAdd = (file: UploadFile) => {
  console.log(file.raw)
  fileList.push(file)
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  } else {
    formEl.validate(async (valid) => {
      if (valid) {
        centerDialogVisible.value = true
      } else {
        ElNotification({
          title: '失败',
          message: '请按要求完成内容填写',
          type: 'error'
        })
      }
    })
  }
}
const resetForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}
const confirmUpload = (formEl: FormInstance | undefined) => {
  centerDialogVisible.value = false
  if (!formEl) {
    return
  }
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await uploadGoods(form.title, form.product_detail, form.price, 'SALE', [])
      if (res.status == HttpStatusCode.Created) {
        ElNotification({
          title: '成功',
          message: '商品上传成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '失败',
          message: '商品上传失败',
          type: 'error'
        })
      }
    }
  })
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__body {
    margin-top: 4px;
    width: 80%;
    padding: 40px;
    border-radius: 4px;
    position: relative;
    height: 100%;
    background-color: #fff;
  }
}
.title {
  font-size: 25px;
  font-weight: 500;
  margin: 40px 0 20px 0;
  color: #606266;
  margin-left: 10%;
}
.container__form__item {
  margin-top: 40px;
  font-size: 12px;
  color: #84868c;
  line-height: 12px;
  font-weight: 400;
}
/deep/ .el-form-item__label {
  font-weight: bold;
}
.container__form__footer {
  margin-top: 48px;
  float: right;
}
.container__form__button {
  border-radius: 10%;
  font-size: 16px;
  min-width: 80px;
  min-height: 40px;
  background-color: #26bdcf;
  color: #ffff;
  border: 0;
  &:hover {
    background-color: #1a95a3;
  }
  &:active {
    opacity: 0.6;
  }
}
.reset{
    background-color: #84868c;
    &:hover {
    background-color: #5a5e62;
  }
  }
</style>
