<template>
  <div class="min-h-screen grid grid-cols-2">
    <!-- Left Side - Login Form -->
    <div class="flex items-center justify-center bg-gray-50 p-8">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-bold mb-6 text-gray-800">Login</h2>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- ID Field -->
          <div>
            <label for="id" class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <input
              id="id"
              v-model="form.id"
              type="text"
              placeholder="Enter your ID"
              class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <p v-if="status === false" class="text-red-600 text-center">Incorrect credentals!</p>
          </div>

          <!-- Forgot Password -->
          <div class="text-right">
            <a href="/forgot-password" class="text-sm text-blue-600 hover:underline"
              >Forgot Password?</a
            >
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>

    <!-- Right Side - Logo -->
    <div class="flex items-center justify-center bg-[#ececec]">
      <img :src="logo" alt="System Logo" class="w-full h-auto object-contain" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import logo from '@/assets/images/fav.png'
const form = reactive({
  id: '',
  password: '',
})
const status = ref(null)

const handleLogin = () => {
  // TODO: send API request to Laravel backend
  if (form.password === 'password' && form.id === '123456789') {
    status.value = true
    window.location.href = '../'
  } else {
    status.value = false
  }
  console.log('Login submitted:', form)
  console.log(status.value)
}
</script>
