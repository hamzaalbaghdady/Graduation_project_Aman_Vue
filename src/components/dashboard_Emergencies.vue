<script setup>
import Table from '@/components/Emergencies_table.vue'
</script>
<template>
  <!-- Dashboard Content -->
  <main class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">Emergencies Managment</h1>
        <h3 class="text-gray-600">Monitor and manage live SOS requests</h3>
      </div>
      <div>
        <RouterLink
          to="/emergencies/add"
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
          ><font-awesome-icon icon="phone" class="mr-1" /> New Phone Entry</RouterLink
        >
      </div>
    </div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Total Emergencies</h3>
          <p class="text-2xl font-bold">30</p>
        </div>
        <span class="text-2xl"><font-awesome-icon icon="plus" class="mr-1" /></span>
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Pending Emergencies</h3>
          <p class="text-2xl font-bold">8</p>
        </div>
        <span class="text-2xl">⏱</span>
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">Active Emergencies</h3>
          <p class="text-2xl font-bold">15</p>
        </div>
        <span class="text-2xl">✔</span>
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between">
        <div>
          <h3 class="text-sm text-gray-500">completed Emergencies</h3>
          <p class="text-2xl font-bold">15</p>
        </div>
        <span class="text-2xl">✔</span>
      </div>
    </div>
    <Table />
  </main>
</template>
