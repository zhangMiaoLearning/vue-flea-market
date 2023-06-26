<template>
  <div class="manage">
    <CommonHeader />
    <div class="manage__body">
      <div class="manage__body__title">Manage User Role</div>
      <div class="manage__body__table">
        <el-table :data="filterTableData" style="width: 100%">
          <el-table-column label="Date" prop="date" />
          <el-table-column label="Name" prop="name" />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <ButtonPopover
                @selectOption="selectOption"
                size="small"
                classStyle="primary"
                buttonName="Edit"
                :menu="manageMenu"
                @click="handleEdit(scope.$index, scope.row)"
              />
              <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)"
                >disable</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface User {
  date: string
  name: string
  address: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const manageMenu = [
  { key: '1', value: 'user' },
  { key: '2', value: 'auditor' }
]
const selectOption = (key: string, value: string) => {
  console.log(key, value)
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style scoped lang="less">
.manage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.manage__body {
  margin-top: 4px;
  width: 80%;
  height: calc(100vh - 54px);
  //background-color: #ffff;
  &__title {
    font-size: 25px;
    font-weight: 500;
    margin: 40px 0 20px 0;
  }
}
/* .manage__body__table {
  border: 0.5px solid #909399;
  border-radius: 2px;
} */
</style>
