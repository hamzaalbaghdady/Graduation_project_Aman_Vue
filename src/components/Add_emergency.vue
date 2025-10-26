<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold text-gray-800">Emergency Call Entry</h1>
      <a href="#" class="text-sm text-gray-600 hover:text-gray-800">📞 Active Call</a>
    </header>

    <!-- Form Card -->
    <div class="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-1">New Emergency Call</h2>
      <p class="text-sm text-gray-500 mb-6">
        Please fill in all available information about the emergency call
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Caller Info -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Caller Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter caller name (if known)"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Caller ID</label>
            <input
              v-model="form.id"
              type="text"
              placeholder="Enter caller ID (if known)"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Caller Phone Number</label>
            <input
              v-model="form.phone"
              required
              type="tel"
              placeholder="+1 (555) 123-4567"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <!-- Location Info -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location Information</label>
          <div class="grid grid-cols-4 gap-4">
            <input
              required
              v-model="form.city"
              type="text"
              placeholder="Enter city"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              required
              v-model="form.neighborhood"
              type="text"
              placeholder="Enter neighborhood"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              required
              v-model="form.street"
              type="text"
              placeholder="Enter street address"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              required
              v-model="form.house_name"
              type="text"
              placeholder="Enter house name"
              Title="The name of the family that has this emergency case."
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <!-- Incident Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Incident Type</label>
          <select
            v-model="form.incidentType"
            required
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select incident type</option>
            <option value="crime">Heart attack</option>
            <option value="crime">Bombing</option>
            <option value="crime">Bleeding</option>
            <option value="fire">🔥 Fire</option>
            <option value="medical">🚑 Medical Emergency</option>
            <option value="accident">🚗 Road Accident</option>
            <option value="crime">🚔 Crime in Progress</option>
          </select>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            v-model="form.notes"
            rows="4"
            placeholder="Enter any additional details about the emergency..."
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>📅 Call received: {{ currentDateTime }}</span>
          <div class="space-x-3">
            <button
              type="button"
              class="px-4 py-2 border rounded-lg bg-red-600 text-white hover:bg-red-800 hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800"
            >
              + Create SOS Entry
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Tips Box -->
    <div class="bg-white mt-6 p-4 rounded-xl shadow max-w-3xl mx-auto">
      <p class="text-sm text-gray-700 flex items-center">
        <span class="mr-2">ℹ️</span>
        <strong>Quick Tips: </strong> Ensure all critical information is captured. Location details
        are essential for emergency response.
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useAlert } from '@/composables/useAlert'
import { emergencyService } from '@/services'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

const currentDateTime = ref('')
onMounted(() => {
  const now = new Date()
  currentDateTime.value = now.toLocaleString()
})

const form = reactive({
  name: '',
  id: '',
  phone: '',
  city: '',
  neighborhood: '',
  street: '',
  house_name: '',
  incidentType: '',
  notes: '',
})

const handleSubmit = async () => {
  console.log('Form submitted:', form)
  try {
    const create = await emergencyService.createEmergency(form.value)
    console.log('API data: ', create)

    // Accessing inside data.server
    if (create.status) {
      successAlert('Created Successfully!', create.message)
    } else {
      errorAlert('Failed!', create.message)
    }
  } catch (error) {
    console.error('Error loading data:', error)
    errorAlert('Failed!', "We can't load data, Help your self with this fake data for now ;)")
  }
}
</script>
