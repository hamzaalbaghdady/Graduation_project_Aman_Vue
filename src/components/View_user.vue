<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="pb-6 flex items-center justify-between">
      <!-- Page Title -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Users Management <span class="text-sm text-gray-500">User #{{ id }}</span>
      </h2>
      <RouterLink
        :to="`/users/edit/${id}`"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg flex items-center gap-2"
        >Edit User</RouterLink
      >
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-6 mx-auto w-[75%]">
      <!-- Request Details -->
      <section>
        <h3 class="text-lg font-medium mb-2">User Details</h3>
        <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span class="font-semibold">User ID:</span> 453258698</p>
          <p><span class="font-semibold">User Name:</span> Yosif Ali</p>
          <p><span class="font-semibold">Address:</span> Gaza, Gaza city, Alremal</p>
          <p><span class="font-semibold">Last knowen location:</span> '20,30,15' '80,75,14'</p>
          <p><span class="font-semibold">Registered Scince:</span> 12-10-2024 9:45:22am</p>
          <p><span class="font-semibold">Use Applecation:</span> Yes</p>

          <p><span class="font-semibold">Gender:</span> Male</p>
          <p><span class="font-semibold">Blood Type:</span> A+</p>
          <p><span class="font-semibold">Age:</span> 35</p>
          <p><span class="font-semibold">Chronic Conditions:</span> Disbetes</p>
          <p><span class="font-semibold">Allergies:</span>None</p>
          <p><span class="font-semibold">Disabilites:</span>None</p>
          <p><span class="font-semibold">Emergency Cantact:</span>0569873214</p>
          <p><span class="font-semibold">status:</span>Active</p>
        </div>
        <p class="mt-3 text-gray-600">
          <span class="font-semibold">Notes:</span>
        </p>
      </section>

      <hr />

      <!-- Activity Log -->
      <section>
        <h3 class="text-lg font-medium mb-2">Activity Log</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li>
            <span class="font-medium text-gray-800">Ambulance Requested</span>
            <a href="/emergencies/view">#REQ-2025-001</a>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 09:30 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Update profile</span>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 10:15 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Update profile</span>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 02:45 PM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Ambulance Requested</span>
            <a href="/emergencies/view">#REQ-2025-001</a>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 09:30 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Update profile</span>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 10:15 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Update profile</span>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 02:45 PM</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
