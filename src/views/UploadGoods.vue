<template>
  <div class="container">
    <CommonHeader />
    <div class="container__body">
      <el-form
        ref="formRef"
        :rules="rules"
        :model="form"
        label-width="100px"
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
        <el-form-item label="商品价格:" prop="price" class="task-form-item">
          <el-input v-model="form.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
      </el-form>
      <div class="container__form__footer">
        <el-button type="primary" @click="submitForm(formRef)" class="container__form__button"
          >发布</el-button
        >
      </div>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
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
  price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }]
}
const labels = ['全新', '九成新', '无包装', '吊牌在', '不砍价', '可小刀']
const fileList = [] as UploadFile[]
const formRef = ref<FormInstance>()
const fileTotal: any = []
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
  console.log(fileTotal)

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
      }
    } else {
      ElNotification({
        title: '失败',
        message: '商品上传失败',
        type: 'error'
      })
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
</style>
