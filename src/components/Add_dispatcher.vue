<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Page Header -->
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold text-gray-800">Add New Dispatcher</h1>
    </header>

    <!-- Form Card -->
    <div class="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <h2 class="text-lg font-semibold mb-1">Add New Dispatcher</h2>
      <p class="text-sm text-gray-500 mb-6">
        Please fill in all available information about the Dispatcher
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Ambulance Info -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Dispathcer ID</label>
            <input
              v-model="form.id"
              type="text"
              placeholder="Enter Dispatcher National ID"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="form.fname"
              type="text"
              placeholder="Enter First Name"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="form.lname"
              type="text"
              placeholder="Enter Last name"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter Email"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Initial Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter Password"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              v-model="form.phone"
              type="number"
              placeholder="Enter Phone number"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <input
              v-model="form.address"
              type="number"
              placeholder="Enter Address"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <!-- Ambulance crew -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Select Permissions <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i
          ></label>
          <p class="text-sm text-gray-500 mb-6">You can select more than one Permission.</p>
          <select
            multiple
            v-model="form.permissions"
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="emargency-managment">Emergency Managment</option>
            <option value="ambulance-managment">Ambulance Managment</option>
            <option value="uer-managment">User Managment</option>
            <option value="dispatcher-managment">Dispatcher Managment</option>
            <option value="driver-crew-managment">Driver & crew Managment</option>
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
        <strong>Quick Tips: </strong> An email will be sent to this dispatcher with initial
        password.
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
  id: '',
  fname: '',
  lname: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  permissions: [],
  notes: '',
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  // TODO: send form data to Laravel API
  console.log('Submitted data: ', form)
}
</script>
