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
    <!-- Table -->
    <Table />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/Emergencies_table.vue'
import Card from '@/components/Card.vue'
import Spinner from '@/components/Spinner.vue'
import ChartComponent from '@/components/Chart.vue'
import { statisticsService } from '@/services'
import { useAlert } from '@/composables/useAlert'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

const stats = ref({
  active: 12,
  pending: 8,
  assigned: 15,
  avilable: 0,
})

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

// const toast = useToast()
const loading = ref(false)
const counts = ref([])

// Load initial data
const loadData = async () => {
  try {
    loading.value = true
    const countsResponse = await statisticsService.getCounts()
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
