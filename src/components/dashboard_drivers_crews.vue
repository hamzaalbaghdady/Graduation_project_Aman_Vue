<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div class="pb-6 items-center justify-between">
          <h1 class="text-3xl">Drivers & Crews Management</h1>
          <h3 class="text-gray-600">Monitor and manage all crews</h3>
        </div>
        <RouterLink
          to="/drivers-crews/add"
          class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          <font-awesome-icon icon="plus" class="mr-2" /> Add Member
        </RouterLink>
      </div>

      <!-- Filters -->
      <div class="bg-white shadow rounded-lg p-4 mb-6">
        <h3 class="font-semibold mb-3">Filters</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            v-model="filters.name"
            type="text"
            placeholder=" Search by name"
            class="rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <select
            v-model="filters.role"
            class="rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Roles</option>
            <option value="Driver">Driver</option>
            <option value="Paramedic">Paramedic</option>
          </select>
          <select
            v-model="filters.status"
            class="rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="On Duty">On Duty</option>
            <option value="Off Duty">Off Duty</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            @click="applyFilters"
            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            <font-awesome-icon icon="filter" class="mr-2" /> Apply Filters
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h4 class="text-lg font-bold">{{ stats.totalDrivers }}</h4>
          <p class="text-sm text-gray-500">Drivers</p>
        </div>
        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h4 class="text-lg font-bold">{{ stats.totalCrews }}</h4>
          <p class="text-sm text-gray-500">Crews</p>
        </div>
        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h4 class="text-lg font-bold text-green-600">{{ stats.onDuty }}</h4>
          <p class="text-sm text-gray-500">On Duty</p>
        </div>
        <div class="bg-white shadow rounded-lg p-4 text-center">
          <h4 class="text-lg font-bold text-yellow-600">{{ stats.offDuty }}</h4>
          <p class="text-sm text-gray-500">Off Duty</p>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold mb-4">Members</h3>
        <Table
          :headers="['ID', 'Name', 'Email', 'Role', 'Team', 'Status', 'Last Active']"
          :data="members"
          :actions="['view', 'edit', 'block']"
          :perPage="4"
          @block="handleBlock"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Table from '@/components/table.vue'

const filters = ref({
  name: '',
  role: '',
  status: '',
})

const stats = ref({
  totalDrivers: 12,
  totalCrews: 8,
  onDuty: 9,
  offDuty: 11,
})

const members = ref([
  {
    id: 405699301,
    name: 'John Doe',
    email: 'john@company.com',
    role: 'Driver',
    team: 'Alpha',
    status: 'On Duty',
    lastActive: '5 mins ago',
  },
  {
    id: 405699301,
    name: 'Lisa Smith',
    email: 'lisa@company.com',
    role: 'Paramedic',
    team: 'Bravo',
    status: 'Active',
    lastActive: '10 mins ago',
  },
  {
    id: 405699301,
    name: 'Mike Chen',
    email: 'mike@company.com',
    role: 'Driver',
    team: 'Delta',
    status: 'Off Duty',
    lastActive: '1 hour ago',
  },
  {
    id: 405699301,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'Paramedic',
    team: 'Echo',
    status: 'Inactive',
    lastActive: 'Yesterday',
  },
])

const applyFilters = () => {
  console.log('Filters applied', filters.value)
}

const statusClass = (status) => {
  switch (status) {
    case 'On Duty':
      return 'bg-green-100 text-green-800'
    case 'Active':
      return 'bg-blue-100 text-blue-800'
    case 'Off Duty':
      return 'bg-yellow-100 text-yellow-800'
    case 'Inactive':
      return 'bg-gray-100 text-gray-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function handleBlock(row) {
  console.log('Block this user:', row)
  // Call Laravel API here
}
</script>
