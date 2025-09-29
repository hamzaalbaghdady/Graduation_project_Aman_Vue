<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <font-awesome-icon icon="list" class="text-xl mr-2" />
      <h1 class="text-2xl font-semibold">Audit Logs</h1>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-xl p-6 mb-6">
      <h2 class="text-lg font-semibold mb-2">System Audit Logs</h2>
      <p class="text-gray-500 text-sm mb-6">
        Track and monitor all system activities and user actions
      </p>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <!-- User Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">User</label>
          <select v-model="filters.user" class="border rounded px-3 py-2">
            <option value="all">All Users</option>
            <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
          </select>
        </div>

        <!-- Start Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" v-model="filters.startDate" class="border rounded px-3 py-2" />
        </div>

        <!-- End Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" v-model="filters.endDate" class="border rounded px-3 py-2" />
        </div>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            @click="applyFilters"
            class="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <font-awesome-icon icon="filter" class="mr-2" /> Apply Filters
          </button>
          <button
            @click="resetFilters"
            class="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <font-awesome-icon icon="undo" class="mr-2" /> Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Audit Trail -->
    <div class="bg-white shadow rounded-xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-semibold">Audit Trail</h3>
        <div class="flex items-center gap-4">
          <p class="text-sm text-gray-500">{{ logs.length.toLocaleString() }} records</p>
          <button
            @click="downloadExcel"
            class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <font-awesome-icon icon="file-export" class="mr-2" /> Export
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="text-gray-600 border-b">
              <th class="py-3 px-4">User</th>
              <th class="py-3 px-4">Action</th>
              <th class="py-3 px-4">Resource</th>
              <th class="py-3 px-4">Timestamp</th>
              <th class="py-3 px-4">IP Address</th>
              <th class="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(log, index) in paginatedLogs"
              :key="index"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <font-awesome-icon icon="user-circle" class="text-xl text-gray-400 mr-2" />
                  <div>
                    <p class="font-medium">{{ log.name }}</p>
                    <p class="text-xs text-gray-500">{{ log.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <p class="font-medium">{{ log.action }}</p>
                <p class="text-xs text-gray-500">{{ log.category }}</p>
              </td>
              <td class="py-3 px-4 text-gray-600">{{ log.resource }}</td>
              <td class="py-3 px-4 text-gray-600">
                <p>{{ log.timestamp }}</p>
                <p class="text-xs text-gray-400">{{ log.relative }}</p>
              </td>
              <td class="py-3 px-4 text-gray-600">{{ log.ip }}</td>
              <td class="py-3 px-4">
                <span
                  :class="
                    log.status === 'Success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  "
                  class="px-3 py-1 rounded-full text-xs font-medium"
                >
                  {{ log.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4 text-sm text-gray-600">
        <p>Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ logs.length }} results</p>
        <div class="flex items-center space-x-2">
          <button
            @click="prevPage"
            :disabled="page === 1"
            :class="page === 1 ? `bg-gray-100` : `bg-indigo-300 hover:bg-indigo-400`"
            class="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            <font-awesome-icon icon="angle-left" />
          </button>
          <span class="px-3 py-1 border rounded-lg bg-gray-100">{{ page }}</span>
          <button
            @click="nextPage"
            :disabled="endIndex >= logs.length"
            :class="endIndex >= logs.length ? `bg-gray-100` : `bg-indigo-300 hover:bg-indigo-400`"
            class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <font-awesome-icon icon="angle-right" />
          </button>
        </div>
      </div>
    </div>

    <!-- Help Button -->
    <button
      class="fixed bottom-6 right-6 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center"
    >
      <font-awesome-icon icon="question" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFileGenerator } from '@/composables/fileGenerator'

const filters = ref({
  user: 'all',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
})

const users = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Wilson', 'Admin System']

const logs = ref([
  {
    name: 'John Smith',
    email: 'john.smith@company.com',
    action: 'User Login',
    category: 'Authentication',
    resource: '/dashboard',
    timestamp: '2025-01-15 09:23:41',
    relative: '2 hours ago',
    ip: '192.168.1.100',
    status: 'Success',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    action: 'Data Export',
    category: 'File Operation',
    resource: '/reports/users.csv',
    timestamp: '2025-01-15 08:45:12',
    relative: '3 hours ago',
    ip: '10.0.0.25',
    status: 'Success',
  },
  {
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    action: 'Failed Login',
    category: 'Authentication',
    resource: '/login',
    timestamp: '2025-01-15 08:12:33',
    relative: '4 hours ago',
    ip: '203.0.113.45',
    status: 'Failed',
  },
  {
    name: 'Lisa Wilson',
    email: 'lisa.wilson@company.com',
    action: 'Settings Update',
    category: 'Configuration',
    resource: '/admin/settings',
    timestamp: '2025-01-15 07:55:18',
    relative: '4 hours ago',
    ip: '172.16.0.10',
    status: 'Success',
  },
  {
    name: 'Admin System',
    email: 'system@company.com',
    action: 'Database Backup',
    category: 'System Operation',
    resource: '/system/backup',
    timestamp: '2025-01-15 06:00:00',
    relative: '6 hours ago',
    ip: '127.0.0.1',
    status: 'Success',
  },
  {
    name: 'Lisa Wilson',
    email: 'lisa.wilson@company.com',
    action: 'Settings Update',
    category: 'Configuration',
    resource: '/admin/settings',
    timestamp: '2025-01-15 07:55:18',
    relative: '4 hours ago',
    ip: '172.16.0.10',
    status: 'Success',
  },
  {
    name: 'Admin System',
    email: 'system@company.com',
    action: 'Database Backup',
    category: 'System Operation',
    resource: '/system/backup',
    timestamp: '2025-01-15 06:00:00',
    relative: '6 hours ago',
    ip: '127.0.0.1',
    status: 'Success',
  },
  {
    name: 'Lisa Wilson',
    email: 'lisa.wilson@company.com',
    action: 'Settings Update',
    category: 'Configuration',
    resource: '/admin/settings',
    timestamp: '2025-01-15 07:55:18',
    relative: '4 hours ago',
    ip: '172.16.0.10',
    status: 'Success',
  },
  {
    name: 'Admin System',
    email: 'system@company.com',
    action: 'Database Backup',
    category: 'System Operation',
    resource: '/system/backup',
    timestamp: '2025-01-15 06:00:00',
    relative: '6 hours ago',
    ip: '127.0.0.1',
    status: 'Success',
  },
])

// Pagination
const page = ref(1)
const pageSize = 5

const startIndex = computed(() => (page.value - 1) * pageSize)
const endIndex = computed(() => Math.min(startIndex.value + pageSize, logs.value.length))
const paginatedLogs = computed(() => logs.value.slice(startIndex.value, endIndex.value))

const nextPage = () => {
  if (endIndex.value < logs.value.length) page.value++
}

const prevPage = () => {
  if (page.value > 1) page.value--
}

const applyFilters = () => {
  console.log('Applying filters:', filters.value)
}

const resetFilters = () => {
  filters.value.user = 'all'
  filters.value.startDate = '2025-01-01'
  filters.value.endDate = '2025-01-31'
}

const { exportToExcel, exportJsonToExcel, exportToCSV } = useFileGenerator()
const downloadExcel = () => {
  // Convert to plain JS array of objects (deep clone)
  const plainData = logs.value.map((e) => ({ ...e }))

  exportToExcel(plainData, 'System_log', 'log', null, true)
    .then(() => console.log('Excel exported'))
    .catch((err) => console.error(err))
}
</script>
