<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold text-gray-800">Add New Ambulance</h1>
    </header>

    <!-- Form Card -->
    <div class="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-1">Add New Ambulance</h2>
      <p class="text-sm text-gray-500 mb-6">
        Please fill in all available information about the Ambulance
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Ambulance Info -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Plate Number</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter plate number"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Brand</label>
            <input
              v-model="form.id"
              type="text"
              placeholder="Enter ambulance brand"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Model</label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="Enter ambulance model"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Driver</label>
            <select
              v-model="form.incidentType"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Driver</option>
              <option value="">John Doo</option>
              <option value="">Jane Doo</option>
              <option value="">Ahmed Ali</option>
              <option value="">Mohammed Ali</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Station</label>
            <select
              v-model="form.incidentType"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Station</option>
              <option value="">Gaza Station</option>
              <option value="">North Gaza Station</option>
              <option value="">Rafah Station</option>
              <option value="">Khanyonis Station</option>
              <option value="">Dear-Albalah Station</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select
              v-model="form.incidentType"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Type</option>
              <option value="">Medical</option>
              <option value="">Managment</option>
              <option value="">Supervisation</option>
            </select>
          </div>
        </div>

        <!-- Ambulance crew -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Select Crew Members <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i
          ></label>
          <p class="text-sm text-gray-500 mb-6">You can select more than one member, Max is 4.</p>
          <select
            multiple
            v-model="form.incidentType"
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">John Doo : Medic</option>
            <option value="">John Doo : Driver</option>
            <option value="">Jane Doo : Medic</option>
            <option value="">Ali Yosef : Medic</option>
            <option value="">Sara Ahmed : Medic</option>
            <option value="">John Doo : Medic</option>
            <option value="">John Doo : Driver</option>
            <option value="">Jane Doo : Medic</option>
            <option value="">Ali Yosef : Medic</option>
            <option value="">Sara Ahmed : Medic</option>
          </select>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            v-model="form.notes"
            rows="4"
            placeholder="Enter any additional details about this ambulance..."
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
import { reactive, ref, onMounted } from 'vue'

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

const handleSubmit = () => {
  console.log('Form submitted:', form)
  // TODO: send form data to Laravel API
  console.log('Submitted data: ', form)
}
</script>
