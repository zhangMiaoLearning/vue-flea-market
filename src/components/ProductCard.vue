<template>
  <div class="card">
    <el-image class="card__img" :src="url" fit="fill" />
    <div class="card__title">标题sadkjf;alsgdj;asldgj萨法的法定身份嘎达阿萨德刚发的嘎</div>
    <div class="card__description">
      <div class="card__description__price">¥7000</div>
      <div class="card__description__time">时间</div>
    </div>
    <div class="card__footer">
      <div class="card__footer__user">姓名</div>
      <div class="card__footer__address">
        <Location />
        新疆维吾尔族自治区
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
import { Location } from '@element-plus/icons-vue'

</script>

<style scoped lang="less">
.card {
  width: 264px;
  &__img {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
  }
  &__title {
    width: 264px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #333;
    line-height: 20px;
    margin-top: 12px;
    transition: all 0.6s ease-in-out;
  }
  &__description {
    display: flex;
    margin-top: 8px;
    align-items: center;
    justify-content: space-between;

    &__price {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: #ff755b;
      line-height: 30px;
      margin-right: 8px;
    }
    &__time {
      font-family: PingFangSC-Semibold;
      font-size: 12px;
      color: #999;
      line-height: 18px;
    }
  }
  &__footer {
    display: flex;
    margin-top: 8px;
    align-items: center;
    justify-content: space-between;
    font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666;
    &__user {
      line-height: 18px;
    }
    &__address {
      background: #f7f7f7;
      border-radius: 13px;
      width: 100px;
      height: 26px;
      padding: 0 8px;
      overflow: hidden;
      white-space: nowrap; 
      line-height: 26px;
      display: flex;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
}
</style>
