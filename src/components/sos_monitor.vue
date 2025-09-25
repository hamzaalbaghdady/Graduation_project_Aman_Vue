<script setup>
import { ref, computed } from 'vue'
import Table from '@/components/table.vue'
import Card from '@/components/Card.vue'

const dispatchers = ['Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez']
const locations = ['Downtown District', 'North Zone', 'East Sector']
const incidentTypes = ['Medical Emergency', 'Fire Emergency', 'Security Threat', 'Extra']

const selectedDispatcher = ref('all')
const selectedLocation = ref('all')
const selectedIncidentType = ref('all')

const sosRequests = ref([
  {
    id: 'SOS-2025-001',
    time: '14:32',
    type: 'Medical Emergency',
    location: 'Downtown District',
    dispatcher: 'Sarah Johnson',
    priority: 'Critical',
    status: 'In Progress',
  },
  {
    id: 'SOS-2025-002',
    time: '14:28',
    type: 'Fire Emergency',
    location: 'North Zone',
    dispatcher: 'Mike Chen',
    priority: 'High',
    status: 'Dispatched',
  },
  {
    id: 'SOS-2025-003',
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
    <h2 class="text-xl font-semibold mb-2">SOS Requests Monitor</h2>
    <p class="text-gray-600 mb-6">
      Monitor all emergency requests across all dispatchers and locations
    </p>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card :title="`Active Requests`" :count="23" :icon="`tachometer-alt`" :icon_color="`blue`" />
      <Card
        :title="`High Priority`"
        :count="5"
        :icon="`exclamation-triangle`"
        :icon_color="`red`"
      />
      <Card :title="`Resolved Today`" :count="68" :icon="`calendar-check`" :icon_color="`green`" />
      <Card
        :title="`Avg Response (minutes)`"
        :count="4.2"
        :icon="`comment-dots`"
        :icon_color="`yellow`"
      />
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-xl p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-1 items-end">
        <!-- Dispatchers Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dispatcher</label>
          <select v-model="selectedDispatcher" class="border rounded px-3 py-2">
            <option value="all">All Dispatchers</option>
            <option v-for="d in dispatchers" :key="d">{{ d }}</option>
          </select>
        </div>

        <!-- Dispatchers Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select v-model="selectedLocation" class="border rounded px-3 py-2">
            <option value="all">All Locations</option>
            <option v-for="l in locations" :key="l">{{ l }}</option>
          </select>
        </div>

        <!-- Type Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select v-model="selectedIncidentType" class="border rounded px-3 py-2">
            <option value="all">All Types</option>
            <option v-for="t in incidentTypes" :key="t">{{ t }}</option>
          </select>
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

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b font-bold">Live SOS Requests</div>
      <Table
        :headers="['ID', 'Time', 'Type', 'Location', 'Dispatcher', 'Priority', 'Status']"
        :data="sosRequests"
        :actions="['view']"
        :perPage="4"
      />
    </div>
  </div>
</template>
