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
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
      >
        <font-awesome-icon icon="download" /> Export Data
      </button>
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
            class="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
          >
            <font-awesome-icon icon="filter" /> Apply Filters
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <p class="text-sm text-gray-500">Total Requests</p>
          <p class="text-xl font-semibold">247</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <p class="text-sm text-gray-500">Completed</p>
          <p class="text-xl font-semibold">231</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <p class="text-sm text-gray-500">Avg Response Time</p>
          <p class="text-xl font-semibold">4.2m</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg text-center">
          <p class="text-sm text-gray-500">Success Rate</p>
          <p class="text-xl font-semibold">93.5%</p>
        </div>
      </div>
    </div>

    <!-- Request History -->
    <div class="bg-white shadow rounded-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-gray-800">Request History</h2>
        <div class="flex gap-2">
          <button class="px-3 py-1 border rounded-lg text-sm flex items-center gap-1">
            <font-awesome-icon icon="file-csv" /> CSV
          </button>
          <button class="px-3 py-1 border rounded-lg text-sm flex items-center gap-1">
            <font-awesome-icon icon="file-pdf" /> PDF
          </button>
        </div>
      </div>

      <!-- Table -->
      <table class="w-full border-collapse text-sm">
        <thead class="border-b text-gray-600">
          <tr>
            <th class="p-3 text-left">Request ID</th>
            <th class="p-3 text-left">Date & Time</th>
            <th class="p-3 text-left">Incident Type</th>
            <th class="p-3 text-left">Location</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Response Time</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in paginatedRequests" :key="req.id" class="border-b hover:bg-gray-50">
            <td class="p-3 font-medium text-indigo-600">#{{ req.id }}</td>
            <td class="p-3">{{ req.date }}</td>
            <td class="p-3">
              <span
                class="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"
                :class="incidentTypeClass(req.type)"
              >
                <font-awesome-icon :icon="incidentTypeIcon(req.type)" />
                {{ req.type }}
              </span>
            </td>
            <td class="p-3">{{ req.location }}</td>
            <td class="p-3">
              <span class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">
                Completed
              </span>
            </td>
            <td class="p-3">{{ req.response }}</td>
            <td class="p-3">
              <button class="text-gray-600 hover:text-indigo-600">
                <font-awesome-icon icon="eye" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
        <p>
          Showing {{ startIndex + 1 }} to {{ Math.min(startIndex + perPage, requests.length) }} of
          {{ requests.length }} results
        </p>

        <div class="flex gap-1">
          <button
            class="px-3 py-1 border rounded-lg"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Prev
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            class="px-3 py-1 border rounded-lg"
            :class="page === currentPage ? 'bg-indigo-600 text-white' : ''"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <button
            class="px-3 py-1 border rounded-lg"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ref({
  from: '2025-01-01',
  to: '2025-01-15',
  type: 'all',
})

const requests = ref([
  {
    id: 'ER-2025-0147',
    date: 'Jan 15, 2025 14:22',
    type: 'Fire Emergency',
    location: '123 Main St, Downtown',
    response: '3.5 min',
  },
  {
    id: 'ER-2025-0146',
    date: 'Jan 15, 2025 13:45',
    type: 'Medical Emergency',
    location: '456 Oak Ave, Midtown',
    response: '2.8 min',
  },
  {
    id: 'ER-2025-0145',
    date: 'Jan 15, 2025 12:30',
    type: 'Police Response',
    location: '789 Pine St, Uptown',
    response: '5.2 min',
  },
  {
    id: 'ER-2025-0144',
    date: 'Jan 15, 2025 11:15',
    type: 'Rescue Operation',
    location: '321 River Rd, Riverside',
    response: '7.1 min',
  },
  // 🔽 Add more dummy rows to test pagination
  {
    id: 'ER-2025-0143',
    date: 'Jan 14, 2025 18:45',
    type: 'Fire Emergency',
    location: '111 Maple St, Suburb',
    response: '4.2 min',
  },
  {
    id: 'ER-2025-0142',
    date: 'Jan 14, 2025 17:15',
    type: 'Medical Emergency',
    location: '222 Birch St, Uptown',
    response: '3.1 min',
  },
  {
    id: 'ER-2025-0141',
    date: 'Jan 14, 2025 16:00',
    type: 'Rescue Operation',
    location: '333 Cedar St, Riverside',
    response: '6.0 min',
  },
])

const applyFilters = () => {
  console.log('Filters applied:', filters.value)
}

const currentPage = ref(1)
const perPage = 4

const totalPages = computed(() => Math.ceil(requests.value.length / perPage))

const startIndex = computed(() => (currentPage.value - 1) * perPage)

const paginatedRequests = computed(() =>
  requests.value.slice(startIndex.value, startIndex.value + perPage),
)

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// incident styling
const incidentTypeClass = (type) => {
  switch (type) {
    case 'Fire Emergency':
      return 'bg-red-100 text-red-600'
    case 'Medical Emergency':
      return 'bg-blue-100 text-blue-600'
    case 'Police Response':
      return 'bg-indigo-100 text-indigo-600'
    case 'Rescue Operation':
      return 'bg-green-100 text-green-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const incidentTypeIcon = (type) => {
  switch (type) {
    case 'Fire Emergency':
      return 'fire'
    case 'Medical Emergency':
      return 'kit-medical'
    case 'Police Response':
      return 'shield-halved'
    case 'Rescue Operation':
      return 'life-ring'
    default:
      return 'circle'
  }
}
</script>
