<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <font-awesome-icon icon="cog" class="mr-3" />
      <h1 class="text-2xl font-semibold">System Configuration</h1>
    </div>

    <!-- Card -->
    <div class="bg-white shadow rounded-xl p-6 max-w-3xl mx-auto">
      <!-- Section Title -->
      <h2 class="text-lg font-semibold mb-4">System Settings</h2>
      <p class="text-gray-500 text-sm mb-6">Configure system parameters and operational limits</p>

      <!-- Emergency Response -->
      <div class="mb-6">
        <div class="flex items-center mb-3">
          <font-awesome-icon icon="exclamation-triangle" class="" />
          <h3 class="font-semibold">Emergency Response Configuration</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Duplicate Request Distance Threshold</label
            >
            <div class="flex">
              <input
                type="number"
                v-model="form.distanceThreshold"
                class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span class="ml-2 text-gray-500 self-center">meters</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">
              Minimum distance between duplicate emergency requests
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SOS Timeout Limit</label>
            <div class="flex">
              <input
                type="number"
                v-model="form.timeoutLimit"
                class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span class="ml-2 text-gray-500 self-center">minutes</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Maximum time before SOS request times out</p>
          </div>
        </div>
      </div>

      <!-- SMS Fallback -->
      <div class="mb-6">
        <div class="flex items-center mb-3">
          <font-awesome-icon icon="sms" class="" />
          <h3 class="font-semibold">SMS Fallback Configuration</h3>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">SMS Gateway Number</label>
          <input
            type="text"
            v-model="form.smsGateway"
            class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p class="text-xs text-gray-400 mt-1">Phone number for SMS gateway service</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">SMS API Key</label>
          <div class="flex">
            <input
              :type="type"
              v-model="form.smsApiKey"
              class="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              @click="viewPassword"
              type="button"
              class="ml-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <font-awesome-icon :icon="eyeIcon" class="" />
            </button>
          </div>
          <p class="text-xs text-gray-400 mt-1">API key for SMS service authentication</p>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-4 flex items-start">
          <font-awesome-icon icon="info-circle" class="mr-3" />
          <p class="text-sm text-gray-600">
            SMS fallback is automatically triggered when primary communication channels fail. Ensure
            your SMS gateway is properly configured and has sufficient credits.
          </p>
        </div>
      </div>

      <!-- Test Configuration -->
      <div class="mb-6">
        <div class="flex items-center mb-3">
          <font-awesome-icon icon="vial" class="" />
          <h3 class="font-semibold">Test Configuration</h3>
        </div>

        <div class="flex gap-4">
          <button
            class="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <font-awesome-icon icon="paper-plane" class="" /> Test SMS Gateway
          </button>
          <button
            class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <font-awesome-icon icon="ruler-combined" class="" /> Test Distance Calculation
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center border-t pt-4">
        <p class="text-xs text-gray-400">Last updated: January 15, 2025 at 2:30 PM</p>
        <div class="flex gap-3">
          <button
            @click="reset"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Reset to Defaults
          </button>
          <button
            @click="save"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <font-awesome-icon icon="save" class="mr-3" /> Save Configuration
          </button>
        </div>
      </div>
    </div>

    <!-- Help Button -->
    <button
      class="fixed bottom-6 right-6 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 flex items-center justify-center"
    >
      <font-awesome-icon icon="question" class="" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const form = ref({
  distanceThreshold: 100,
  timeoutLimit: 10,
  smsGateway: '+1234567890',
  smsApiKey: 'SMS154f5fg2d8f2158e2d8es315e5',
})
const type = ref('password')
let eyeIcon = ref('eye')
const viewPassword = () => {
  if (type.value === 'password') {
    type.value = 'text'
    eyeIcon = 'eye-slash'
  } else if (type.value === 'text') {
    type.value = 'password'
    eyeIcon = 'eye'
  }
}

const save = () => {
  console.log('Saved: ' + form.value)
}
const reset = () => {
  // Reset each property individually
  form.value.distanceThreshold = 100
  form.value.timeoutLimit = 10
  form.value.smsGateway = '+1234567890'
  form.value.smsApiKey = 'SMS154f5fg2d8f2158e2d8es315e5'

  console.log('Reset to defaults:', form.value)
}
</script>
