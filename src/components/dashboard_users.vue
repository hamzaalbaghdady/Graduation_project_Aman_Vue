<template>
  <!-- Dashboard Content -->
  <main class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">User Managment</h1>
        <h3 class="text-gray-600">Monitor and manage Users</h3>
      </div>
    </div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Total Users</h3>
          <p class="text-2xl font-bold">5862</p>
        </div>
        <font-awesome-icon icon="user" class="mr-3 text-2xl text-green-600" />
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Mobile App Users</h3>
          <p class="text-2xl font-bold">4823</p>
        </div>
        <font-awesome-icon icon="mobile-android-alt" class="mr-3 text-2xl text-blue-600" />
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Blocked Users</h3>
          <p class="text-2xl font-bold">15</p>
        </div>
        <font-awesome-icon icon="remove" class="mr-3 text-2xl text-red-600" />
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b font-bold">System Users</div>
      <Table
        :headers="['ID', 'Name', 'Gender', 'Address', 'Info', 'Status']"
        :data="users"
        :actions="['view', 'edit', 'block']"
        :perPage="3"
        @block="handleBlock"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/table.vue'

const users = ref([
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '968453150',
    name: 'Mohammed Ali',
    gender: 'male',
    address: 'Gaza, Alnosirate, Block 1',
    info: null,
    status: 'Blocked',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: { blood_type: 'A+' },
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '968453150',
    name: 'Mohammed Ali',
    gender: 'male',
    address: 'Gaza, Alnosirate, Block 1',
    info: null,
    status: 'Blocked',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: { blood_type: 'AB-' },
    status: 'Active',
  },
  {
    id: '912852963',
    name: 'John Doo',
    gender: 'Male',
    address: 'Gaza, Gaza city, Alremal',
    info: null,
    status: 'Active',
  },
  {
    id: '402315487',
    name: 'Sara Ali',
    gender: 'Female',
    address: 'Gaza, Gaza city, Tal-Alhawa',
    info: null,
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'mohammed Ahmed',
    gender: 'male',
    address: 'Gaza, Dearalbalh, Alberka',
    info: null,
    status: 'Active',
  },
])

const statusClass = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-gray-600'
    case 'Blocked':
      return 'bg-red-100 text-blue-600'

    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function handleBlock(row) {
  console.log('Delete this user:', row)
  // Call Laravel API here
}
</script>
