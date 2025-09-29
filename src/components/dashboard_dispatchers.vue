<template>
  <!-- Dashboard Content -->
  <main class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">Dispatchers Managment</h1>
        <h3 class="text-gray-600">Monitor and manage Dispatchers</h3>
      </div>
      <div>
        <RouterLink
          to="/dispatchers/add"
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
          ><font-awesome-icon icon="plus" class="mr-1" /> Add new Dispatcher</RouterLink
        >
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card
        :title="`Total Dispatchers`"
        :count="stats.total"
        :icon="`headset`"
        :bg_color="`green`"
        :icon_color="`green`"
      />
      <Card
        :title="`Active Dispatchers`"
        :count="stats.active"
        :icon="`headset`"
        :bg_color="`red`"
        :icon_color="`red`"
      />
    </div>

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b flex justify-between">
        <h1 class="font-bold">Dispatchers</h1>
        <button
          @click="downloadExcel"
          class="flex items-center p-2 rounded bg-green-600 text-white font-medium hover:bg-green-700"
        >
          <font-awesome-icon icon="file-excel" class="text-xl mr-1" />
        </button>
      </div>
      <Table
        :headers="['ID', 'Name', 'Gender', 'Permissions', 'status']"
        :data="dispatchers"
        :actions="['view', 'edit', 'delete']"
        :perPage="4"
        @delete="handleDelete"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/table.vue'
import { useAlert } from '@/composables/useAlert'
import Card from '@/components/Card.vue'
import { useFileGenerator } from '@/composables/fileGenerator'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

const dispatchers = ref([
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    permissions: 'default',
    status: 'Active',
  },
  {
    id: '968453150',
    name: 'Mohammed Ali',
    gender: 'male',
    address: 'Gaza, Alnosirate, Block 1',
    permissions: 'default',
    status: 'Inactive',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    permissions: ['manage users'],
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    permissions: 'default',
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    permissions: 'default',
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    permissions: 'default',
    status: 'Active',
  },
  {
    id: '968453150',
    name: 'Mohammed Ali',
    gender: 'male',
    address: 'Gaza, Alnosirate, Block 1',
    permissions: 'default',
    status: 'Inactive',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    permissions: { blood_type: 'AB-' },
    status: 'Active',
  },
  {
    id: '912852963',
    name: 'John Doo',
    gender: 'Male',
    address: 'Gaza, Gaza city, Alremal',
    permissions: 'default',
    status: 'Active',
  },
  {
    id: '402315487',
    name: 'Sara Ali',
    gender: 'Female',
    address: 'Gaza, Gaza city, Tal-Alhawa',
    permissions: 'default',
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'mohammed Ahmed',
    gender: 'male',
    address: 'Gaza, Dearalbalh, Alberka',
    permissions: 'default',
    status: 'Active',
  },
])

const stats = ref({
  total: 15,
  active: 13,
})

function handleDelete(row) {
  confirmDialog(
    'Are you sure you want to delete dispatcher #' + row.id + '?',
    "You won't be able to undo this!",
  ).then((result) => {
    if (result.isConfirmed) {
      // Call Laravel API here
      if (true) {
        successAlert('Deleted!', 'Your item has been deleted.')
      } else {
        errorAlert('Failed!', 'Your item has Not been deleted.')
      }
    }
  })
}

const { exportToExcel, exportJsonToExcel, exportToCSV } = useFileGenerator()
const downloadExcel = () => {
  // Convert to plain JS array of objects (deep clone)
  const plainData = dispatchers.value.map((e) => ({ ...e }))

  exportToExcel(plainData, 'dispatchers', 'dispatchers', null, true)
    .then(() => console.log('Excel exported'))
    .catch((err) => console.error(err))
}
</script>
