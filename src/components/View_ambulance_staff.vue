<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="pb-6 flex items-center justify-between">
      <!-- Page Title -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Ambulance Staff Management <span class="text-sm text-gray-500">Member #{{ id }}</span>
      </h2>
      <RouterLink
        :to="`/Ambulance Staffs/edit/${id}`"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-lg flex items-center gap-2"
        >Edit Ambulance Staff</RouterLink
      >
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-6 mx-auto w-[75%]">
      <!-- Request Details -->
      <section>
        <h3 class="text-lg font-medium mb-2">Ambulance Staff Details</h3>
        <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span class="font-semibold">Ambulance Staff ID:</span> 958201447</p>
          <p><span class="font-semibold">Name:</span> Ahmed Alali</p>
          <p><span class="font-semibold">Address:</span> Gaza, Gaza city, Alremal</p>
          <p><span class="font-semibold">Email:</span> ahmedali1248@gmail.com</p>
          <p><span class="font-semibold">Registered Scince:</span> 12-05-2023 9:45:22am</p>
          <p><span class="font-semibold">Last Update:</span> 29-10-2025 5:35:12am</p>
          <p><span class="font-semibold">Role:</span> Driver</p>
          <p><span class="font-semibold">Gender:</span> Male</p>
          <p><span class="font-semibold">Age:</span> 45</p>
          <p><span class="font-semibold">Emergency Cantact:</span> 0569873214</p>
          <p><span class="font-semibold">Status:</span> Active</p>
          <p><span class="font-semibold">Shift:</span> 6am-2pm</p>
          <p><span class="font-semibold">Ambulance:</span> A123582764</p>
          <p><span class="font-semibold">Crew:</span> C1328422</p>
        </div>
        <p class="mt-3 text-gray-600">
          <span class="font-semibold">Notes:</span>
          This driver has a lot of experites, please keep in maind when it comes to training new
          drivers.
        </p>
      </section>

      <hr />

      <!-- Activity Log -->
      <section>
        <h3 class="text-lg font-medium mb-2">Activity Log</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li>
            <span class="font-medium text-gray-800">Assigned to Emergency Request </span>
            <a class="hover:text-blue-500" href="/ambulances/view">A123582764</a>
            <span class="font-medium text-gray-800"> to emargency</span>
            <a class="hover:text-blue-500" href="/emergencies/view"> #REQ-2025-001</a>
            <span class="ml-2 text-gray-400">Fe 15, 2025 - 09:30 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Assigned to Emergency Request </span>
            <a class="hover:text-blue-500" href="/ambulances/view">A1237413287</a>
            <span class="font-medium text-gray-800"> to emargency</span>
            <a class="hover:text-blue-500" href="/emergencies/view"> #REQ-2025-011</a>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 09:40 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Assigned to Emergency Request </span>
            <a class="hover:text-blue-500" href="/ambulances/view">A123758624</a>
            <span class="font-medium text-gray-800"> to emargency</span>
            <a class="hover:text-blue-500" href="/emergencies/view"> #REQ-2025-020</a>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 10:01 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Assigned to Emergency Request </span>
            <a class="hover:text-blue-500" href="/ambulances/view">A1230087414</a>
            <span class="font-medium text-gray-800"> to emargency</span>
            <a class="hover:text-blue-500" href="/emergencies/view"> #REQ-2025-031</a>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 10:03 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Assigned to Emergency Request </span>
            <a class="hover:text-blue-500" href="/ambulances/view">A123582764</a>
            <span class="font-medium text-gray-800"> to emargency</span>
            <a class="hover:text-blue-500" href="/emergencies/view"> #REQ-2025-001</a>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 04:38 PM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Assigned to Emergency Request </span>
            <a class="hover:text-blue-500" href="/ambulances/view">A123582764</a>
            <span class="font-medium text-gray-800"> to emargency</span>
            <a class="hover:text-blue-500" href="/emergencies/view"> #REQ-2025-001</a>
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 09:30 PM</span>
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
