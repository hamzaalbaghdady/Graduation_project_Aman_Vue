<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="pb-6 flex items-center justify-between">
      <!-- Page Title -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Request Management <span class="text-sm text-gray-500"># {{ id }}</span>
      </h2>
      <RouterLink
        :to="`/emergencies/edit/${id}`"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg flex items-center gap-2"
        >Edit Request</RouterLink
      >
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-6 w-max mx-auto">
      <!-- Request Details -->
      <section>
        <h3 class="text-lg font-medium mb-2">Request Details</h3>
        <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span class="font-semibold">Submitted by: </span> {{ emergency.dispatcher }}</p>
          <p><span class="font-semibold">Civilian ID: </span> {{ emergency.civilian_id }}</p>
          <p>
            <span class="font-semibold">Priority: </span>
            <span class="text-red-600 font-bold"> {{ emergency.priority }}</span>
          </p>
          <p><span class="font-semibold">Location: </span> {{ emergency.location }}</p>
          <p><span class="font-semibold">Emergency Case: </span>{{ emergency.type }}</p>
          <p>
            <span class="font-semibold">status: </span>
            <span class="text-blue-600 font-bold"> {{ emergency.status }}</span>
          </p>
          <p><span class="font-semibold">Created: </span> {{ emergency.created_at }}</p>
          <p><span class="font-semibold">Dispatcher: </span> {{ emergency.dispatcher }}</p>
          <p><span class="font-semibold">Assigned Ambulance: </span> A1325468125</p>
          <p><span class="font-semibold">Driver Name: </span> John Smith</p>
          <p><span class="font-semibold">Driver Phone: </span> 0599658754</p>
          <p><span class="font-semibold">Updated at: </span> {{ emergency.updated_at }}</p>
        </div>
        <p class="mt-3 text-gray-600">
          <span class="font-semibold">Description: </span> Need new laptop setup for remote work.
          Current device is running slowly and affecting productivity.
        </p>
      </section>

      <!-- Update Status -->
      <section>
        <h3 class="text-lg font-medium mb-3">Update Request Status</h3>
        <div class="flex gap-3">
          <button class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg">
            <font-awesome-icon icon="circle-check" /> Mark as Completed
          </button>
          <button class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg">
            <font-awesome-icon icon="ban" /> Mark as Canceled
          </button>
          <button class="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg">
            <font-awesome-icon icon="xmark" /> Cancel Request
          </button>
        </div>
      </section>

      <!-- Assignment -->
      <section>
        <h3 class="text-lg font-medium mb-2">Assigne An Ambulance</h3>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <select class="border rounded-lg p-2 w-full">
              <option>Select Ambulance</option>
              <option>A202210204</option>
              <option>A201901548</option>
              <option>A201900457</option>
              <option>A202354867</option>
              <option>A202536985</option>
            </select>
          </div>
          <textarea
            class="w-full mt-4 border rounded-lg p-2"
            placeholder="Add any specific instructions or notes for the assignee..."
            rows="3"
          ></textarea>
          <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg w-full">
            <font-awesome-icon icon="check" />Assigne Ambulance
          </button>
        </form>
      </section>

      <!-- Activity Log -->
      <section>
        <h3 class="text-lg font-medium mb-2">Activity Log</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li>
            <span class="font-medium text-gray-800">Request created</span> by John Smith
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 09:30 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Status changed to Pending Review</span>
            by System Auto-Assignment
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 10:15 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Request reviewed and approved</span>
            by Sarah Johnson (IT Manager)
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 02:45 PM</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Spinner from '@/components/Spinner.vue'
import { emergencyService } from '@/services'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const emergency = ref([])
const emergencyTypes = ref([])

const loading = ref(false)
// Load initial data
const loadData = async () => {
  try {
    loading.value = true
    const [emergenciesResponse, emergencyTypesResponse] = await Promise.all([
      emergencyService.getEmergency(id),
      emergencyService.getEmergencyTypes(),
    ])

    emergency.value = emergenciesResponse.data
    emergencyTypes.value = emergencyTypesResponse.data
  } catch (error) {
    console.error('Error loading data:', error)
    errorAlert('Failed!', "We can't load data, Help your self with this fake data for now ;)")
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>
