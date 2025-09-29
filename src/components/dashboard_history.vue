<template>
  <div class="p-8 bg-gray-50 min-h-screen space-y-8">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Reports & History</h1>
        <p class="text-sm text-gray-500 flex items-center gap-2">
          <font-awesome-icon icon="clock" />
          Last updated: Jan 15, 2025 at 2:30 PM
        </p>
      </div>
      <button
        @click="downloadExcel"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
      >
        <font-awesome-icon icon="download" /> Export Data
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card
        :title="`Total Requests`"
        :count="stats.totalRequests"
        :icon="`chart-line`"
        :bg_color="`blue`"
        :icon_color="`blue`"
      />
      <Card
        :title="`Completed`"
        :count="stats.completed"
        :icon="`check-circle`"
        :bg_color="`blue`"
        :icon_color="`green`"
      />
      <Card
        :title="`Avg Response Time`"
        :count="stats.avgTime"
        :icon="`wave-square`"
        :bg_color="`blue`"
        :icon_color="`blue`"
      />
      <Card
        :title="`Success Rate`"
        :count="stats.successRate"
        :icon="`percent`"
        :bg_color="`blue`"
        :icon_color="`blue`"
      />
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-xl p-6 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Date From -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Date Range</label>
          <input type="date" class="w-full border rounded-lg p-2" v-model="filters.from" />
        </div>

        <!-- Date To -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">To Date</label>
          <input type="date" class="w-full border rounded-lg p-2" v-model="filters.to" />
        </div>

        <!-- Incident Type -->
        <div>
          <label class="block text-sm text-gray-600 mb-1">Incident Type</label>
          <select v-model="filters.type" class="w-full border rounded-lg p-2">
            <option value="all">All Types</option>
            <option value="fire">Fire Emergency</option>
            <option value="medical">Medical Emergency</option>
            <option value="police">Police Response</option>
            <option value="rescue">Rescue Operation</option>
          </select>
        </div>

        <!-- Apply Filters -->
        <div class="flex items-end">
          <button
            @click="applyFilters"
            class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <font-awesome-icon icon="filter" /> Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b flex justify-between">
        <h1 class="font-bold">History</h1>
        <button
          @click="downloadExcel"
          class="flex items-center p-2 rounded bg-green-600 text-white font-medium hover:bg-green-700"
        >
          <font-awesome-icon icon="file-excel" class="text-xl mr-1" />
        </button>
      </div>
      <Table
        :headers="['ID', 'Date', 'Type', 'Location', 'Response', 'status']"
        :data="requests"
        :perPage="3"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Table from '@/components/table.vue'
import { useAlert } from '@/composables/useAlert'
import Card from '@/components/Card.vue'
import { useFileGenerator } from '@/composables/fileGenerator'

const filters = ref({
  from: '2025-01-01',
  to: '2025-01-15',
  type: 'all',
})

const stats = ref({
  totalRequests: 253,
  completed: 187,
  avgTime: 4.7,
  successRate: 91,
})
const requests = ref([
  {
    id: 'ER-2025-0147',
    date: 'Jan 15, 2025 14:22',
    type: 'Fire Emergency',
    location: '123 Main St, Downtown',
    response: '3.5 min',
    status: 'Completed',
  },
  {
    id: 'ER-2025-0146',
    date: 'Jan 15, 2025 13:45',
    type: 'Medical Emergency',
    location: '456 Oak Ave, Midtown',
    response: '2.8 min',
    status: 'Canceled',
  },
  {
    id: 'ER-2025-0145',
    date: 'Jan 15, 2025 12:30',
    type: 'Police Response',
    location: '789 Pine St, Uptown',
    response: '5.2 min',
    status: 'Completed',
  },
  {
    id: 'ER-2025-0144',
    date: 'Jan 15, 2025 11:15',
    type: 'Rescue Operation',
    location: '321 River Rd, Riverside',
    response: '7.1 min',
    status: 'Completed',
  },
  // 🔽 Add more dummy rows to test pagination
  {
    id: 'ER-2025-0143',
    date: 'Jan 14, 2025 18:45',
    type: 'Fire Emergency',
    location: '111 Maple St, Suburb',
    response: '4.2 min',
    status: 'Failed',
  },
  {
    id: 'ER-2025-0142',
    date: 'Jan 14, 2025 17:15',
    type: 'Medical Emergency',
    location: '222 Birch St, Uptown',
    response: '3.1 min',
    status: 'Completed',
  },
  {
    id: 'ER-2025-0141',
    date: 'Jan 14, 2025 16:00',
    type: 'Rescue Operation',
    location: '333 Cedar St, Riverside',
    response: '6.0 min',
    status: 'Completed',
  },
])

const applyFilters = () => {
  console.log('Filters applied:', filters.value)
}

const { exportToExcel, exportJsonToExcel, exportToCSV } = useFileGenerator()
const downloadExcel = () => {
  // Convert to plain JS array of objects (deep clone)
  const plainData = requests.value.map((e) => ({ ...e }))

  exportToExcel(plainData, 'history', 'history', null, true)
    .then(() => console.log('Excel exported'))
    .catch((err) => console.error(err))
}
</script>
