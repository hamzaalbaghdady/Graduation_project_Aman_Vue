<template>
  <!-- Dashboard Content -->
  <main class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 items-center justify-between">
      <h1 class="text-3xl">Dashboard</h1>
      <h3 class="text-gray-600">Monitor and manage all resources</h3>
    </div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-2 mb-3">
      <div class="bg-blue-100 p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Active Emergencies</h3>
          <p class="text-2xl font-bold">12</p>
        </div>
        <font-awesome-icon icon="exclamation-triangle" class="text-2xl text-green-500" />
      </div>

      <div class="bg-blue-100 p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Pending Emergencies</h3>
          <p class="text-2xl font-bold">8</p>
        </div>
        <font-awesome-icon icon="exclamation-triangle" class="text-2xl text-red-500" />
      </div>

      <div class="bg-blue-100 p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Assigned Ambulances</h3>
          <p class="text-2xl font-bold">15</p>
        </div>
        <font-awesome-icon icon="ambulance" class="text-2xl text-red-500" />
      </div>

      <div class="bg-blue-100 p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Avilable Ambulances</h3>
          <p class="text-2xl font-bold">0</p>
        </div>
        <font-awesome-icon icon="ambulance" class="text-2xl text-green-500" />
      </div>
    </div>

    <!-- Charts Cards -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Emergencies-Time Line Chart</h3>
        </div>
        <ChartComponent
          type="line"
          title="Emergencies"
          :labels="[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]"
          :data="[1586, 150, 496, 700, 654, 1235, 1111, 2036, 5398, 0, 0, 0]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Emergencies Pie Chart</h3>
        </div>
        <ChartComponent
          type="pie"
          title="Incident Types"
          :labels="['Bombing', 'Heart Attack', 'Fire', 'Breaks']"
          :data="[1500, 90, 158, 387]"
        />
      </div>
    </div>
    <!-- Table -->
    <Table />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/Emergencies_table.vue'
import ChartComponent from '@/components/Chart.vue'

const requests = ref([
  {
    id: '#SOS-2025-001',
    civilian: 'John Smith',
    phone: '+1 555-0123',
    location: '123 Main St, Downtown',
    time: '2 min ago',
    status: 'Pending',
  },
  {
    id: '#SOS-2025-002',
    civilian: 'Sarah Johnson',
    phone: '+1 555-0456',
    location: '456 Oak Ave, Midtown',
    time: '5 min ago',
    status: 'Assigned',
  },
  {
    id: '#SOS-2025-003',
    civilian: 'Mike Davis',
    phone: '+1 555-0789',
    location: '789 Pine Rd, Uptown',
    time: '12 min ago',
    status: 'Completed',
  },
  {
    id: '#SOS-2025-004',
    civilian: 'Emma Wilson',
    phone: '+1 555-0321',
    location: '321 Elm St, Eastside',
    time: '18 min ago',
    status: 'Canceled',
  },
  {
    id: '#SOS-2025-005',
    civilian: 'Robert Brown',
    phone: '+1 555-0654',
    location: '654 Cedar Blvd, Westside',
    time: '25 min ago',
    status: 'Pending',
  },
])

const statusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-gray-100 text-gray-600'
    case 'Assigned':
      return 'bg-blue-100 text-blue-600'
    case 'Completed':
      return 'bg-green-100 text-green-600'
    case 'Canceled':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}
</script>
