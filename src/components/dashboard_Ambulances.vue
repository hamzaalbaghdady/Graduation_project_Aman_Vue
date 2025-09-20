<template>
  <!-- Dashboard Content -->
  <main class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">Ambulances Managment</h1>
        <h3 class="text-gray-600">Monitor and manage amblunces</h3>
      </div>
      <div>
        <RouterLink
          to="/ambulances/add"
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
          ><font-awesome-icon icon="plus" class="mr-1" /> Add new Ambulance</RouterLink
        >
      </div>
    </div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Total Ambulances</h3>
          <p class="text-2xl font-bold">35</p>
        </div>
        <font-awesome-icon icon="ambulance" class="text-xl text-red-500" />
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Availabel Ambulances</h3>
          <p class="text-2xl font-bold">8</p>
        </div>
        <span class="text-2xl">⏱</span>
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Assigned Ambulances</h3>
          <p class="text-2xl font-bold">15</p>
        </div>
        <span class="text-2xl">✔</span>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b font-bold">Live SOS Requests</div>
      <Table
        :headers="['ID', 'Driver', 'Crew_size', 'Location', 'status']"
        :data="amblunces"
        :actions="['view', 'edit', 'delete']"
        :perPage="3"
        @delete="handleDelete"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/table.vue'

const amblunces = ref([
  {
    id: 'A202536985',
    driver: 'John Smith',
    crew_size: '2',
    location: '123 Main St, Downtown',
    status: 'Assigned',
  },
  {
    id: 'A202354867',
    driver: 'Sarah Johnson',
    crew_size: '3',
    location: '456 Oak Ave, Midtown',
    status: 'Assigned',
  },
  {
    id: 'A201900457',
    driver: 'Mike Davis',
    crew_size: '2',
    location: '789 Pine Rd, Uptown',
    status: 'Free',
  },
  {
    id: 'A201901548',
    driver: 'Emma Wilson',
    crew_size: '4',
    location: '321 Elm St, Eastside',
    status: 'Assigned',
  },
  {
    id: 'A202210204',
    driver: 'Robert Brown',
    crew_size: '2',
    location: '654 Cedar Blvd, Westside',
    status: 'Fuel',
  },
])

const statusClass = (status) => {
  switch (status) {
    case 'Fuel':
      return 'bg-gray-100 text-gray-600'
    case 'Assigned':
      return 'bg-blue-100 text-blue-600'
    case 'Free':
      return 'bg-green-100 text-green-600'
    case 'Fix':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function handleDelete(row) {
  console.log('Delete this user:', row)
  // Call Laravel API here
}
</script>
