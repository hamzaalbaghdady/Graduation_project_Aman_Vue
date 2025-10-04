<template>
  <!-- Dashboard Content -->
  <div v-if="loading" class="text-center h-full text-6xl p-5 relative"><Spinner /></div>
  <main v-else class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">Ambulances Managment</h1>
        <h3 class="text-gray-600">Monitor and manage amblunces</h3>
      </div>
      <div>
        <RouterLink
          to="/ambulances/add"
          class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
          ><font-awesome-icon icon="plus" class="mr-1" /> Add new Ambulance</RouterLink
        >
      </div>
    </div>
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card
        :title="`Total Ambulances`"
        :count="stats.total"
        :icon="`ambulance`"
        :bg_color="`blue`"
        :icon_color="`blue`"
      />
      <Card
        :title="`Availabel Ambulances`"
        :count="stats.availabel"
        :icon="`ambulance`"
        :bg_color="`blue`"
        :icon_color="`green`"
      />
      <Card
        :title="`Assigned Ambulances`"
        :count="stats.assigned"
        :icon="`ambulance`"
        :bg_color="`blue`"
        :icon_color="`red`"
      />
    </div>

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b flex justify-between">
        <h1 class="font-bold">Ambulances</h1>
        <button
          @click="downloadExcel"
          class="flex items-center p-2 rounded bg-green-600 text-white font-medium hover:bg-green-700"
        >
          <font-awesome-icon icon="file-excel" class="text-xl mr-1" />
        </button>
      </div>
      <Table
        :headers="['ID', 'Driver', 'Crew_size', 'Location', 'status']"
        :data="ambulances"
        :actions="['view', 'edit', 'delete']"
        :perPage="3"
        @delete="handleDelete"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/table.vue'
import { useAlert } from '@/composables/useAlert'
import Card from '@/components/Card.vue'
import { useFileGenerator } from '@/composables/fileGenerator'
import { statisticsService, ambulanceService } from '@/services'
import Spinner from '@/components/Spinner.vue'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

const ambulances = ref([
  {
    id: 'A202536985',
    driver: 'John Smith',
    crew_size: '2',
    location: '123 Main St, Downtown',
    status: 'Assigned',
  },
  {
    id: 'A202354867',
    driver: 'Sarah Johnson',
    crew_size: '3',
    location: '456 Oak Ave, Midtown',
    status: 'Assigned',
  },
  {
    id: 'A201900457',
    driver: 'Mike Davis',
    crew_size: '2',
    location: '789 Pine Rd, Uptown',
    status: 'Free',
  },
  {
    id: 'A201901548',
    driver: 'Emma Wilson',
    crew_size: '4',
    location: '321 Elm St, Eastside',
    status: 'Assigned',
  },
  {
    id: 'A202210204',
    driver: 'Robert Brown',
    crew_size: '2',
    location: '654 Cedar Blvd, Westside',
    status: 'Fuel',
  },
])

const stats = ref({
  total: 35,
  availabel: 17,
  assigned: 18,
})

function handleDelete(row) {
  confirmDialog(
    'Are you sure you want to delete ambulance #' + row.id + '?',
    "You won't be able to undo this!",
  ).then((result) => {
    if (result.isConfirmed) {
      // Call Laravel API here
      if (true) {
        successAlert('Deleted!', 'Your item has been deleted.')
      } else {
        errorAlert('Failed!', 'Your item has Not been deleted.')
      }
    }
  })
}

const { exportToExcel, exportJsonToExcel, exportToCSV } = useFileGenerator()
const downloadExcel = () => {
  // Convert to plain JS array of objects (deep clone)
  const plainData = ambulances.value.map((e) => ({ ...e }))

  exportToExcel(plainData, 'ambulances', 'ambulances', null, true)
    .then(() => console.log('Excel exported'))
    .catch((err) => console.error(err))
}

// load data from api

const loading = ref(false)
const counts = ref([])

// Load initial data
const loadData = async () => {
  try {
    loading.value = true
    const [ambulanceResponse, countsResponse] = await Promise.all([
      ambulanceService.getAmbulances(),
      statisticsService.getCounts(),
    ])
    ambulances.value = ambulancesResponse.data
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
