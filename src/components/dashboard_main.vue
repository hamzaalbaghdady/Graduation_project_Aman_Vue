<template>
  <!-- Dashboard Content -->
  <div v-if="loading" class="text-center h-full text-6xl p-5 relative"><Spinner /></div>
  <main v-else class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 items-center justify-between">
      <h1 class="text-3xl">Dashboard</h1>
      <h3 class="text-gray-600">Monitor and manage all resources</h3>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card
        :title="`Active Emergencies`"
        :count="stats.active"
        :icon="`exclamation-triangle`"
        :bg_color="`blue`"
        :icon_color="`green`"
      />
      <Card
        :title="`Pending Emergencies`"
        :count="stats.pending"
        :icon="`exclamation-triangle`"
        :bg_color="`blue`"
        :icon_color="`red`"
      />
      <Card
        :title="`Assigned Ambulances`"
        :count="stats.assigned"
        :icon="`ambulance`"
        :bg_color="`blue`"
        :icon_color="`red`"
      />
      <Card
        :title="`Avilable Ambulances`"
        :count="stats.avilable"
        :icon="`ambulance`"
        :bg_color="`blue`"
        :icon_color="`green`"
      />
    </div>

    <!-- Charts Cards -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Emergencies-Time Line Chart</h3>
        </div>
        <ChartComponent
          type="line"
          :title="lineChart.title"
          :labels="lineChart.labels"
          :data="lineChart.data"
        />
      </div>

      <div class="bg-white p-6 rounded shadow">
        <div class="mb-5">
          <h3 class="text-lg text-black-500 font-bold">Emergencies Pie Chart</h3>
        </div>
        <ChartComponent
          type="pie"
          :title="BieChart.title"
          :labels="BieChart.labels"
          :data="BieChart.data"
        />
      </div>
    </div>
    <!-- Emergencies Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b flex justify-between">
        <h1 class="font-bold">Live SOS Requests</h1>
        <button
          @click="downloadExcel"
          class="flex items-center p-2 rounded bg-green-600 text-white font-medium hover:bg-green-700"
        >
          <font-awesome-icon icon="file-excel" class="text-xl mr-1" />
        </button>
      </div>

      <Table
        :headers="[
          'ID',
          'Civilian_id',
          'Time',
          'Location',
          'Type',
          'Dispatcher',
          'status',
          'Priority',
        ]"
        :data="emergencies"
        :actions="['view', 'edit']"
        :perPage="5"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/table.vue'
import Card from '@/components/Card.vue'
import Spinner from '@/components/Spinner.vue'
import ChartComponent from '@/components/Chart.vue'
import { statisticsService, emergencyService } from '@/services'
import { useAlert } from '@/composables/useAlert'
import { useFileGenerator } from '@/composables/fileGenerator'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()
// Stats
const stats = ref({
  active: 12,
  pending: 8,
  assigned: 15,
  avilable: 0,
})
// Emergincies
const emergencies = ref([
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E202210204',
    civilian_id: '865932547',
    time: '20 min ago',
    location: '654 Cedar Blvd, Westside',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Canceled',
    priority: 'Low',
  },
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E202210204',
    civilian_id: '865932547',
    time: '20 min ago',
    location: '654 Cedar Blvd, Westside',
    type: 'Fire',
    dispatcher: 'John Doo',
    status: 'Canceled',
    priority: 'Low',
  },
])
// Charts
const lineChart = ref({
  title: 'Emergencies',
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  data: [1586, 150, 496, 700, 654, 1235, 1111, 2036, 5398, 0, 0, 0],
})
const BieChart = ref({
  title: 'Incident Types',
  labels: ['Bombing', 'Heart Attack', 'Fire', 'Breaks'],
  data: [1500, 90, 158, 387],
})

const loading = ref(false)
const counts = ref([])

// Export Excel
const { exportToExcel, exportJsonToExcel, exportToCSV } = useFileGenerator()
const downloadExcel = () => {
  // Convert to plain JS array of objects (deep clone)
  const plainData = emergencies.value.map((e) => ({ ...e }))

  exportToExcel(plainData, 'emergencies', 'emergencies', null, true)
    .then(() => console.log('Excel exported'))
    .catch((err) => console.error(err))
}

// Load initial data
const loadData = async () => {
  try {
    loading.value = true
    const [emergenciesResponse, countsResponse] = await Promise.all([
      emergencyService.getEmergencies(),
      statisticsService.getCounts(),
    ])

    emergencies.value = emergenciesResponse.data
    counts.value = countsResponse.data
  } catch (error) {
    console.error('Error loading data:', error)
    errorAlert('Failed!', "We can't load data, Help your self with this fake data for now ;)")
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>
