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
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Total Dispatchers</h3>
          <p class="text-2xl font-bold">15</p>
        </div>
        <font-awesome-icon icon="headset" class="mr-3 text-2xl text-gray-600" />
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Active Dispatchers</h3>
          <p class="text-2xl font-bold">13</p>
        </div>
        <font-awesome-icon icon="headset" class="mr-3 text-2xl text-green-600" />
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b font-bold">Dispatchers</div>
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
    status: 'Unactive',
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
    status: 'Unactive',
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

const statusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-gray-600'
    case 'Unactive':
      return 'bg-red-100 text-blue-600'

    default:
      return 'bg-gray-100 text-gray-600'
  }
}
function handleDelete(row) {
  console.log('Delete this user:', row)
  // Call Laravel API here
}
</script>
