<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold text-gray-800">Edit Crew</h1>
    </header>

    <!-- Form Card -->
    <div class="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-1">Edit Crew</h2>
      <p class="text-sm text-gray-500 mb-6">
        Please fill in all available information about the Crew
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Ambulance Info -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Crew ID</label>
            <input
              v-model="form.id"
              type="text"
              placeholder="Enter Crew ID"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700"> Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Enter Name"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Size</label>
            <input
              v-model="form.size"
              type="number"
              max="4"
              placeholder="Enter Crew Size"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <!-- members -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Select members <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i
          ></label>
          <p>You can select multible members but do not exceed 4.</p>
          <select
            multiple
            v-model="form.members"
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" selected>Select Role</option>
            <option value="Driver: John DOO">Driver: John DOO</option>
            <option value="Paramedic: Sarah Ali">Paramedic: Sarah Ali</option>
            <option value="Paramedic: Mohammed Ahmed">Paramedic: Mohammed Ahmed</option>
            <option value="Paramedic: Mahmood Hasan">Paramedic: Mahmood Hasan</option>
            <option value="Driver: Ahmed Yousef">Driver: Ahmed Yousef</option>
            <option value="Paramedic: Fatema ALhasan">Paramedic: Fatema ALhasan</option>
            <option value="Paramedic: Ahmed Ali">Paramedic: Ahmed Ali</option>
            <option value="Paramedic: Ahmed Mahmmod">Paramedic: Ahmed Mahmmod</option>
            <option value="Driver: John DOO">Driver: John DOO</option>
          </select>
        </div>
        <!-- Ambulances -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Select members <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i
          ></label>
          <select
            v-model="form.ambulance"
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="" selected>Select Ambulance</option>
            <option value="A1534154532">A1534154532</option>
            <option value="A4115154510">A4115154510</option>
            <option value="A2502139701">A2502139701</option>
            <option value="A8009327401">A8009327401</option>
            <option value="A1008003001">A1008003001</option>
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
        <strong>Quick Tips: </strong> Make sure to enter all essinetial data about crew.
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  id: '51358',
  name: 'Alpha',
  size: 3,
  members: ['Driver: John DOO', 'Paramedic: Mohammed Ahmed', 'Paramedic: Sarah Ali'],
  ambulance: 'A2502139701',
  notes: '...',
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  // TODO: send form data to Laravel API
  console.log('Submitted data: ', form)
}
</script>
