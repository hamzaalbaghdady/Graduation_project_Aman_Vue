<script setup>
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const dispatchers = ['All Dispatchers', 'Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez']
const locations = ['All Locations', 'Downtown District', 'North Zone', 'East Sector']
const incidentTypes = ['All Types', 'Medical Emergency', 'Fire Emergency', 'Security Threat']

const selectedDispatcher = ref('All Dispatchers')
const selectedLocation = ref('All Locations')
const selectedIncidentType = ref('All Types')

const sosRequests = ref([
  {
    id: '#SOS-2025-001',
    time: '14:32',
    type: 'Medical Emergency',
    location: 'Downtown District',
    dispatcher: 'Sarah Johnson',
    priority: 'Critical',
    status: 'In Progress',
  },
  {
    id: '#SOS-2025-002',
    time: '14:28',
    type: 'Fire Emergency',
    location: 'North Zone',
    dispatcher: 'Mike Chen',
    priority: 'High',
    status: 'Dispatched',
  },
  {
    id: '#SOS-2025-003',
    time: '14:25',
    type: 'Security Threat',
    location: 'East Sector',
    dispatcher: 'Lisa Rodriguez',
    priority: 'Medium',
    status: 'Resolved',
  },
])

// Filtered list
const filteredRequests = computed(() => {
  return sosRequests.value.filter((r) => {
    return (
      (selectedDispatcher.value === 'All Dispatchers' ||
        r.dispatcher === selectedDispatcher.value) &&
      (selectedLocation.value === 'All Locations' || r.location === selectedLocation.value) &&
      (selectedIncidentType.value === 'All Types' || r.type === selectedIncidentType.value)
    )
  })
})
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-2">SOS Request Monitor</h2>
    <p class="text-gray-600 mb-6">
      Monitor all emergency requests across all dispatchers and locations
    </p>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select v-model="selectedDispatcher" class="border rounded px-3 py-2">
          <option v-for="d in dispatchers" :key="d">{{ d }}</option>
        </select>
        <select v-model="selectedLocation" class="border rounded px-3 py-2">
          <option v-for="l in locations" :key="l">{{ l }}</option>
        </select>
        <select v-model="selectedIncidentType" class="border rounded px-3 py-2">
          <option v-for="t in incidentTypes" :key="t">{{ t }}</option>
        </select>
      </div>
      <div class="mt-4 flex gap-2">
        <button class="bg-black text-white px-4 py-2 rounded">Apply Filters</button>
        <button class="bg-gray-200 px-4 py-2 rounded">Reset</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">Active Requests</p>
        <p class="text-2xl font-semibold">23</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">High Priority</p>
        <p class="text-2xl font-semibold">8</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">Resolved Today</p>
        <p class="text-2xl font-semibold">156</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <p class="text-gray-500">Avg Response</p>
        <p class="text-2xl font-semibold">4.2m</p>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white p-4 rounded-lg shadow">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-600">
            <th class="py-2">Request ID</th>
            <th>Time</th>
            <th>Type</th>
            <th>Location</th>
            <th>Dispatcher</th>
            <th>Priority</th>
            <th>Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in filteredRequests" :key="req.id" class="border-b">
            <td class="py-2">{{ req.id }}</td>
            <td>{{ req.time }}</td>
            <td>{{ req.type }}</td>
            <td>{{ req.location }}</td>
            <td>{{ req.dispatcher }}</td>
            <td>
              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-red-100 text-red-600': req.priority === 'Critical',
                  'bg-orange-100 text-orange-600': req.priority === 'High',
                  'bg-blue-100 text-blue-600': req.priority === 'Medium',
                }"
              >
                {{ req.priority }}
              </span>
            </td>
            <td>
              <span
                class="px-2 py-1 rounded text-xs"
                :class="{
                  'bg-yellow-100 text-yellow-700': req.status === 'In Progress',
                  'bg-green-100 text-green-700': req.status === 'Resolved',
                  'bg-blue-100 text-blue-700': req.status === 'Dispatched',
                }"
              >
                {{ req.status }}
              </span>
            </td>
            <td class="text-center flex justify-center gap-3">
              <font-awesome-icon icon="eye" class="cursor-pointer text-gray-600 hover:text-black" />
              <font-awesome-icon
                icon="edit"
                class="cursor-pointer text-gray-600 hover:text-black"
              />
              <font-awesome-icon
                icon="trash"
                class="cursor-pointer text-gray-600 hover:text-red-600"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
