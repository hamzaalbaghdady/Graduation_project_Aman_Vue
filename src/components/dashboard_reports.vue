<template>
  <!-- Dashboard Content -->
  <main class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">Reports And Statistics</h1>
        <h3 class="text-gray-600">Monitor and export reports</h3>
      </div>
      <div class="flex gap-5">
        <RouterLink
          to="#"
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
          ><font-awesome-icon icon="file-pdf" class="mr-1" />Download as PDF</RouterLink
        >
        <RouterLink
          to="#"
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
          ><font-awesome-icon icon="file-excel" class="mr-1" />Download as Excel</RouterLink
        >
      </div>
    </div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-red-500">
        <div>
          <h3 class="text-sm text-gray-500">Total Ambulances</h3>
          <p class="text-2xl font-bold">35</p>
        </div>
        <font-awesome-icon icon="ambulance" class="mr-3 text-2xl" />
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-red-800">
        <div>
          <h3 class="text-sm text-gray-500">Total Emergencies</h3>
          <p class="text-2xl font-bold">5831</p>
        </div>
        <font-awesome-icon icon="exclamation-triangle" class="mr-3 text-2xl" />
      </div>

      <div
        class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-blue-500"
      >
        <div>
          <h3 class="text-sm text-gray-500">Total Users</h3>
          <p class="text-2xl font-bold">128K</p>
        </div>
        <font-awesome-icon icon="user" class="mr-3 text-2xl" />
      </div>

      <div
        class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-blue-500"
      >
        <div>
          <h3 class="text-sm text-gray-500">Total Crews</h3>
          <p class="text-2xl font-bold">45</p>
        </div>
        <font-awesome-icon icon="people-group" class="mr-3 text-2xl" />
      </div>

      <div
        class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-green-500"
      >
        <div>
          <h3 class="text-sm text-gray-500">Total Stations</h3>
          <p class="text-2xl font-bold">8</p>
        </div>
        <font-awesome-icon icon="map-location" class="mr-3 text-2xl" />
      </div>

      <div
        class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-blue-500"
      >
        <div>
          <h3 class="text-sm text-gray-500">Total Dispatcher</h3>
          <p class="text-2xl font-bold">15</p>
        </div>
        <font-awesome-icon icon="headset" class="mr-3 text-2xl" />
      </div>

      <div
        class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-blue-500"
      >
        <div>
          <h3 class="text-sm text-gray-500">Total Drivers</h3>
          <p class="text-2xl font-bold">40</p>
        </div>
        <font-awesome-icon icon="drivers-license" class="mr-3 text-2xl" />
      </div>

      <div class="bg-white p-6 rounded shadow flex items-center justify-between hover:text-red-500">
        <div>
          <h3 class="text-sm text-gray-500">Total Medics</h3>
          <p class="text-2xl font-bold">95</p>
        </div>
        <font-awesome-icon icon="medkit" class="mr-3 text-2xl" />
      </div>
    </div>

    <!-- Charts Cards -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Users Pie Chart</h3>
        </div>
        <ChartComponent
          type="pie"
          title="Platform"
          :labels="['Mobile Application', 'Traditional Way']"
          :data="[1500, 3000]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Emergencies Pie Chart</h3>
        </div>
        <ChartComponent
          type="pie"
          title="Incident Types"
          :labels="['Bombing', 'Heart Attack', 'Fire', 'Breaks']"
          :data="[1500, 90, 158, 387]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Emergencies-Time Line Chart</h3>
        </div>
        <ChartComponent
          type="line"
          title="Emergencies"
          :labels="[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]"
          :data="[1586, 150, 496, 700, 654, 1235, 1111, 2036, 5398, 0, 0, 0]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Response Time-Time Line Chart</h3>
        </div>
        <ChartComponent
          type="line"
          title="Response Times"
          :labels="[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]"
          :data="[30.2, 28.8, 27.1, 23.0, 20.5, 20.1, 15.7, 14.0, 12.8, 0, 0, 0]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Users_Time Bar Chart</h3>
        </div>
        <ChartComponent
          type="bar"
          title="Users"
          :labels="['Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep']"
          :data="[120, 325, 482, 705, 1048, 1387, 1583]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Top Crews Bar Chart</h3>
        </div>
        <ChartComponent
          type="bar"
          title="Top Crews"
          :labels="['#C1', '#C2', '#C3', '#C4', '#C5']"
          :data="[120, 230, 80, 145, 99]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Platform Pie Chart</h3>
        </div>
        <ChartComponent
          type="pie"
          title="Platform"
          :labels="['101', 'App', 'SMS']"
          :data="[2537, 932, 583]"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Dispatcher-Emergencies Bar Chart</h3>
        </div>
        <ChartComponent
          type="bar"
          title="Requests per Day"
          :labels="['#D1', '#D2', '#D3', '#D4', '#D5']"
          :data="[155, 162, 143, 120, 235]"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import ChartComponent from '@/components/Chart.vue'
</script>
