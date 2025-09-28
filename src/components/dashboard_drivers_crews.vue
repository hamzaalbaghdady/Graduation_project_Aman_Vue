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
        <div class="flex items-center gap-3">
          <RouterLink
            to="/drivers-crews/crews/add"
            class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <font-awesome-icon icon="plus" class="mr-2" /> Add Crew
          </RouterLink>

          <RouterLink
            to="/drivers-crews/members/add"
            class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <font-awesome-icon icon="plus" class="mr-2" /> Add Member
          </RouterLink>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white shadow rounded-lg p-4 mb-6">
        <h3 class="font-semibold mb-3">Filters</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            v-model="filters.name"
            type="Search"
            placeholder=" Search by name"
            class="px-3 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow"
          />
          <select
            v-model="filters.role"
            class="rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow"
          >
            <option value="">All Roles</option>
            <option value="Driver">Driver</option>
            <option value="Paramedic">Paramedic</option>
          </select>
          <select
            v-model="filters.status"
            class="rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow"
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
      <div class="bg-white shadow rounded-lg p-4 mb-5">
        <h3 class="p-4 border-b font-bold">Crews</h3>
        <Table
          :headers="['ID', 'Name', 'Size', 'Members', 'Status']"
          :data="crews"
          :actions="['edit', 'delete']"
          :perPage="4"
          :link="`/drivers-crews/crews/edit/`"
          @delete="handleDelete"
        />
      </div>

      <!-- Table -->
      <div class="bg-white shadow rounded-lg p-4">
        <h3 class="p-4 border-b font-bold">Members</h3>
        <Table
          :headers="['ID', 'Name', 'Email', 'Role', 'Crew', 'Status', 'Last_Active']"
          :data="members"
          :actions="['view', 'edit', 'block']"
          :perPage="4"
          :link="`/drivers-crews/members/edit/`"
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
import Swal from 'sweetalert2'
import { useAlert } from '@/composables/useAlert'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

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
    crew: 'Alpha',
    status: 'On Duty',
    last_active: '5 mins ago',
  },
  {
    id: 985324158,
    name: 'Lisa Smith',
    email: 'lisa@company.com',
    role: 'Paramedic',
    crew: 'Bravo',
    status: 'Active',
    last_active: '10 mins ago',
  },
  {
    id: 825306930,
    name: 'Mike Chen',
    email: 'mike@company.com',
    role: 'Driver',
    crew: 'Delta',
    status: 'Off Duty',
    last_active: '1 hour ago',
  },
  {
    id: 405699301,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'Paramedic',
    crew: 'Echo',
    status: 'Inactive',
    last_active: 'Yesterday',
  },
  {
    id: 405694280,
    name: 'Jane Doe',
    email: 'Jane@company.com',
    role: 'Paramedic',
    crew: 'Bravo',
    status: 'On Duty',
    last_active: '5 mins ago',
  },
  {
    id: 405482322,
    name: 'Lisa Smith',
    email: 'lisa@company.com',
    role: 'Paramedic',
    crew: 'Bravo',
    status: 'Inactive',
    last_active: '10 mins ago',
  },
  {
    id: 487469325,
    name: 'Ahmed Ali',
    email: 'ahmed152@company.com',
    role: 'Driver',
    crew: 'Delta',
    status: 'Off Duty',
    last_active: '6 hours ago',
  },
  {
    id: 803050111,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'Paramedic',
    crew: 'Echo',
    status: 'Inactive',
    last_active: 'Yesterday',
  },
])

const crews = ref([
  {
    id: 25451,
    name: 'Alpha',
    size: 3,
    members: ['Lisa Smith', 'Sarah Johnson', 'Mike Chen'],
    status: 'Active',
  },
  {
    id: 25745,
    name: 'Delta',
    size: 2,
    members: ['Sarah Johnson', 'Mike Chen'],
    status: 'Active',
  },
  {
    id: 25486,
    name: 'Bravo',
    size: 4,
    members: ['John Doe', 'Lisa Smith', 'Sarah Johnson', 'Mike Chen'],
    status: 'Active',
  },
  {
    id: 25896,
    name: 'Echo',
    size: 3,
    members: ['Mike Chen', 'Lisa Smith', 'Sarah Johnson'],
    status: 'Inactive',
  },
])

const applyFilters = () => {
  console.log('Filters applied', filters.value)
}

function handleBlock(row) {
  confirmDialog(
    'Are you sure you want to block member #' + row.id + '?',
    "You won't be able to undo this!",
  ).then((result) => {
    if (result.isConfirmed) {
      // Call Laravel API here
      if (false) {
        successAlert('Blocked!', 'Your item has been blocked.')
      } else {
        errorAlert('Failed!', 'Your item has Not been blocked.')
      }
    }
  })
}
function handleDelete(row) {
  confirmDialog(
    'Are you sure you want to delete crew #' + row.id + '?',
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
</script>
