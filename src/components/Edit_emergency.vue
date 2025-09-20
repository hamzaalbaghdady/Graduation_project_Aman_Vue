<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold text-gray-800">Edit Emergency</h1>
    </header>

    <!-- Form Card -->
    <div class="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-1">Edit Emergency</h2>
      <p class="text-sm text-gray-500 mb-6">Please update only the necessary fields only!</p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Caller Info -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Caller Name</label>
            <input
              v-model="form.name"
              type="text"
              value=""
              placeholder="Enter caller id"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Caller ID</label>
            <input
              v-model="form.id"
              type="text"
              value=""
              placeholder="Enter caller id"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Caller Phone Number</label>
            <input
              v-model="form.phone"
              type="tel"
              value=""
              placeholder="Enter caller phone number"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <!-- Location Info -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location Information</label>
          <div class="grid grid-cols-4 gap-4">
            <input
              v-model="form.city"
              type="text"
              value=""
              placeholder="Enter emergency city"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              v-model="form.neighborhood"
              type="text"
              value=""
              placeholder="Enter emergency neighborhood"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              v-model="form.street"
              type="text"
              value=""
              placeholder="Enter emergency street"
              class="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              v-model="form.house_name"
              type="text"
              value=""
              placeholder="Enter emergency house name"
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
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select incident type</option>
            <option value="crime" selected>Heart attack</option>
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
          <span></span>
          <div class="space-x-3">
            <button
              type="button"
              class="px-4 py-2 border rounded-lg bg-red-600 text-white hover:bg-red-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800"
            >
              Update
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
import { reactive } from 'vue'

const form = reactive({
  name: 'Jhon Doo',
  id: '958324901',
  phone: '0599657001',
  city: 'Gaza',
  neighborhood: 'Altofah',
  street: 'Yafa st',
  house_name: 'john doo house',
  incidentType: 'fire',
  notes: '...',
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  // TODO: send form data to Laravel API
  console.log('Submitted data: ', form)
}
</script>
