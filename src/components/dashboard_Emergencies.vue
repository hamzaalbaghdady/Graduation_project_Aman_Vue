<template>
  <!-- Dashboard Content -->
  <div v-if="loading" class="text-center h-full text-6xl p-5 relative"><Spinner /></div>
  <main v-else class="flex-1 p-6 overflow-y-auto">
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
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card
        :title="`Total Emergencies`"
        :count="stats.total"
        :icon="`database`"
        :bg_color="`blue`"
        :icon_color="`blue`"
      />
      <Card
        :title="`Pending Emergencies`"
        :count="stats.pending"
        :icon="`hourglass-2`"
        :bg_color="`red`"
        :icon_color="`red`"
      />
      <Card
        :title="`Active Emergencie`"
        :count="stats.active"
        :icon="`check-circle`"
        :bg_color="`yellow`"
        :icon_color="`green`"
      />
      <Card
        :title="`completed Emergencies`"
        :count="stats.completed"
        :icon="`flag-checkered`"
        :bg_color="`green`"
        :icon_color="`blue`"
      />
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-xl p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
        <!-- Dispatchers Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dispatcher</label>
          <select v-model="selectedDispatcher" class="w-full border rounded px-3 py-2">
            <option value="all">All Dispatchers</option>
            <option v-for="d in dispatchers" :key="d">{{ d }}</option>
          </select>
        </div>

        <!-- Dispatchers Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select v-model="selectedLocation" class="w-full border rounded px-3 py-2">
            <option value="all">All Locations</option>
            <option v-for="l in locations" :key="l">{{ l }}</option>
          </select>
        </div>

        <!-- Type Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select v-model="selectedIncidentType" class="w-full border rounded px-3 py-2">
            <option value="all">All Types</option>
            <option v-for="t in incidentTypes" :key="t">{{ t }}</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3">
          <button
            @click="applyFilters"
            class="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <font-awesome-icon icon="filter" class="mr-2" /> Apply Filters
          </button>
          <button
            @click="resetFilters"
            class="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <font-awesome-icon icon="undo" class="mr-2" /> Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Emergencies Table -->
    <ETable />

    <!-- Emergency Types Table -->
    <div class="bg-white rounded shadow mt-9">
      <div class="flex justify-between border-b items-center">
        <h1 class="p-4 font-bold">Manage Emergency Types</h1>
        <RouterLink
          to="/emergencies/types/add"
          class="flex items-center p-2 m-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800 h-10"
          ><font-awesome-icon icon="plus" class="mr-1" /> Add New Type</RouterLink
        >
      </div>
      <Table
        :headers="['ID', 'Type', 'Description']"
        :data="emergencyTypes"
        :actions="['edit', 'delete']"
        :perPage="8"
        :link="`/emergencies/types/edit/`"
        @delete="handleDelete"
      />
    </div>
  </main>
</template>

<script setup>
import ETable from '@/components/Emergencies_table.vue'
import Table from '@/components/table.vue'
import { ref, computed, onMounted } from 'vue'
import { statisticsService, dispatcherService, emergencyService } from '@/services'
import { useAlert } from '@/composables/useAlert'
import Card from '@/components/Card.vue'
import Spinner from '@/components/Spinner.vue'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

const emergencyTypes = [
  // Critical & Life-Threatening (Highest Priority)
  {
    id: 1,
    type: 'Unconscious - Not Breathing',
    description: 'Person is unconscious and not breathing, requires immediate CPR',
  },
  {
    id: 2,
    type: "Choking - Can't Breathe",
    description: 'Person is choking and cannot breathe or speak',
  },
  {
    id: 3,
    type: 'Heart Attack / Severe Chest Pain',
    description: 'Severe chest pain, pressure, or discomfort, possibly radiating to arm/jaw',
  },
  {
    id: 4,
    type: 'Stroke / Sudden Numbness',
    description: 'Sudden numbness, weakness, confusion, trouble speaking, or facial drooping',
  },
  {
    id: 5,
    type: 'Severe Allergic Reaction',
    description: 'Difficulty breathing, throat swelling, hives after exposure to allergen',
  },
  {
    id: 6,
    type: 'Major Trauma',
    description: 'Serious injury from car accident, fall from height, or major impact',
  },
  {
    id: 7,
    type: 'Severe Bleeding',
    description: 'Uncontrollable bleeding that cannot be stopped with direct pressure',
  },
  {
    id: 8,
    type: 'Suicidal/Homicidal Emergency',
    description: 'Person expressing intent to harm themselves or others',
  },

  // Serious Medical Emergencies
  {
    id: 9,
    type: 'Difficulty Breathing',
    description: 'Severe asthma attack, COPD exacerbation, or breathing difficulties',
  },
  {
    id: 10,
    type: 'Active Seizure',
    description: 'Person is currently having a seizure or multiple seizures',
  },
  {
    id: 11,
    type: 'Unconscious but Breathing',
    description: 'Person is unconscious but breathing normally',
  },
  {
    id: 12,
    type: 'Diabetic Emergency',
    description: 'Diabetic person confused, unconscious, or with severe low/high blood sugar',
  },
  {
    id: 13,
    type: 'Severe Burn',
    description: 'Major burns covering large area or affecting face, hands, or airways',
  },
  {
    id: 14,
    type: 'Poisoning / Overdose',
    description: 'Ingestion of poison, drug overdose, or chemical exposure',
  },
  {
    id: 15,
    type: 'Sudden Severe Headache',
    description: 'Worst headache ever experienced, could indicate serious condition',
  },

  // Injury & Trauma
  {
    id: 16,
    type: 'Serious Fall',
    description: 'Fall from height or fall causing inability to move or get up',
  },
  {
    id: 17,
    type: 'Broken Bone',
    description: 'Visible deformity, severe pain, or suspected fracture',
  },
  {
    id: 18,
    type: 'Head Injury',
    description: 'Head trauma with confusion, vomiting, or loss of consciousness',
  },
  { id: 19, type: 'Deep Cut / Laceration', description: 'Deep wound that may require stitches' },
  { id: 20, type: 'Eye Injury', description: 'Serious injury to the eye affecting vision' },

  // Other Medical Issues
  {
    id: 21,
    type: 'High Fever with Confusion',
    description: 'High fever accompanied by confusion, especially in children or elderly',
  },
  {
    id: 22,
    type: 'Severe Abdominal Pain',
    description: 'Intense abdominal pain that is unbearable',
  },
  {
    id: 23,
    type: 'Severe Vomiting/Diarrhea',
    description: 'Prolonged vomiting or diarrhea causing dehydration',
  },
  {
    id: 24,
    type: 'Severe Unmanageable Pain',
    description: 'Pain that cannot be controlled with usual methods',
  },
  {
    id: 25,
    type: 'Pregnancy Complications',
    description: 'Late-term bleeding, severe pain, or labor complications',
  },
  {
    id: 26,
    type: 'Mental Health Crisis',
    description: 'Severe anxiety, panic attack, or psychotic episode',
  },

  // Other & Environmental
  {
    id: 27,
    type: 'Near-Drowning',
    description: 'Person rescued from water and having breathing difficulties',
  },
  { id: 28, type: 'Electrocution', description: 'Electric shock or lightning strike' },
  {
    id: 29,
    type: 'Heat Stroke',
    description: 'High body temperature with confusion after heat exposure',
  },
  {
    id: 30,
    type: 'Hypothermia',
    description: 'Extreme cold exposure causing very low body temperature',
  },
  {
    id: 31,
    type: 'Stuck / Trapped',
    description: 'Person trapped in vehicle or structure but not crushed',
  },
  {
    id: 32,
    type: 'Unknown Serious Condition',
    description: 'Person appears very sick but exact condition is unknown',
  },
]

const stats = ref({
  total: 758,
  pending: 17,
  active: 18,
  completed: 723,
})

// Filters
const dispatchers = ['Sarah Johnson', 'Mike Chen', 'Lisa Rodriguez']
const locations = ['Downtown District', 'North Zone', 'East Sector']
const incidentTypes = emergencyTypes.map((emergency) => emergency.type)

const selectedDispatcher = ref('all')
const selectedLocation = ref('all')
const selectedIncidentType = ref('all')

// Filtered list
const filteredRequests = computed(() => {
  return sosRequests.value.filter((r) => {
    return (
      (selectedDispatcher.value === 'All Dispatchers' ||
        r.dispatcher === selectedDispatcher.value) &&
      (selectedLocation.value === 'All Locations' || r.location === selectedLocation.value) &&
      (selectedIncidentType.value === 'All Types' || r.type === selectedIncidentType.value)
    )
  })
})

// Handle emergency type delete
function handleDelete(row) {
  confirmDialog(
    'Are you sure you want to delete "' + row.type + '"?',
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

// const toast = useToast()
const loading = ref(false)
const counts = ref([])

// Load initial data
const loadData = async () => {
  try {
    loading.value = true
    const [emergenciesResponse, dispatchersResponse, countsResponse] = await Promise.all([
      emergencyService.getEmergencies(),
      dispatcherService.getDispatchers(),
      statisticsService.getCounts(),
    ])

    emergencies.value = emergenciesResponse.data
    dispatchers.value = dispatchersResponse.data
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
