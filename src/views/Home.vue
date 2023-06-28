<template>
  <CommonHeader title="首页" />
  <div class="container">
    <div class="container__filter">
      <div class="container__filter__tag">
        <div class="container__filter__tag-text">排序: 最新发布</div>
        <div class="container__filter__tag-text">
          价格
          <div class="icon">
            <CaretTop @click="isActive = true" :class="icon__up" />
            <CaretBottom @click="isActive = false" :class="icon__down" />
          </div>
        </div>

        <div class="container__filter__tag__price">
          <el-input
            v-model="minPrice"
            class="container__filter__tag__input"
            placeholder="最低价格"
          />
          -
          <el-input
            v-model="maxPrice"
            class="container__filter__tag__input"
            placeholder="最高价格"
          />
          <div>
            <el-button
              type="primary"
              @click="sumbitPriceFilter(minPrice, maxPrice)"
              class="container__filter__tag__button"
              >确定</el-button
            >
            <el-button
              type="primary"
              @click="resetPriceInput"
              class="container__filter__tag__button reset"
              >重置</el-button
            >
          </div>
        </div>
      </div>
      <el-input
        v-model="input"
        class="container__filter__input"
        placeholder="搜索"
        :prefix-icon="Search"
      />
    </div>
    <div class="container__list">
      <div class="container__list__content">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div class="container__list__footer">
        <el-pagination
          v-model:current-page="currentPage3"
          v-model:page-size="pageSize3"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
const input = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const isActive = ref(true)
const icon__up = computed(() => (isActive.value ? 'icon__active' : 'icon'))
const icon__down = computed(() => (isActive.value ? 'icon' : 'icon__active'))
const sumbitPriceFilter = (min: String, max: String) => {
  console.log(min, max)
}
const resetPriceInput = () => {
  minPrice.value = ''
  maxPrice.value = ''
}
const currentPage3 = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const pageSize3 = ref(100)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<style scoped lang="less">
.container {
  &__filter {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;
    margin: 1%;
    justify-content: space-between;
    &__input {
      width: 30%;
      margin: 1%;
    }
    &__tag {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      margin: 1%;
      &-text {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #333;
        min-width: 100px;
      }
      &__price {
        min-width: 500px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      &__input {
        width: 30%;
      }
      &__button {
        border-radius: 4px;
        font-size: 14px;
        min-width: 40px;
        min-height: 30px;
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
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #ffffff;
    height: 100vh;
    margin: 1%;
    border-radius: 8px;
    min-width: 1756px;
    &__content {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 20px; /* 单元格间距 */
      grid-auto-rows: 300px;
      justify-items: center;
      align-items: center;
    }
  }
}
/deep/.el-input {
  --el-input-bg-color: #f5f6f9;
  --el-input-focus-border-color: #26bdcf;
  &__wrapper {
    border-radius: 20px;
  }
}
/deep/.el-pagination {
  --el-pagination-hover-color: #26bdcf;
}
.icon {
  width: 25px;
  height: 25px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &__active {
    color: #26bdcf;
  }
}
.reset {
  background-color: #84868c;
  &:hover {
    background-color: #5a5e62;
  }
}
</style>
