<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold text-gray-800">Edit Emergency Type</h1>
    </header>

    <!-- Form Card -->
    <div class="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-1">Edit Emergency Type</h2>
      <p class="text-sm text-gray-500 mb-6">
        Make sure that you are in deed need this Emergency Type before createing it.
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Emergency Type Info -->
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Emergency Type Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter Emergency Type name"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Enter any additional details about this permission..."
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span></span>
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Tips Box -->
    <div class="bg-white mt-6 p-4 rounded-xl shadow max-w-3xl mx-auto">
      <p class="text-sm text-gray-700 flex items-center">
        <span class="mr-2">ℹ️</span>
        <strong>Quick Tips: </strong> Ensure to enter all requierd data.
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: 'Major Trauma',
  description: 'Serious injury from car accident, fall from height, or major impact',
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  // TODO: send form data to Laravel API
}
</script>
