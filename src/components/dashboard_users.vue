<template>
  <!-- Dashboard Content -->
  <div v-if="loading" class="text-center h-full text-6xl p-5 relative"><Spinner /></div>
  <main v-else class="flex-1 p-6 overflow-y-auto">
    <!-- Title -->
    <div class="pb-6 flex items-center justify-between">
      <div>
        <h1 class="text-3xl">User Managment</h1>
        <h3 class="text-gray-600">Monitor and manage Users</h3>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card
        :title="`Total Users`"
        :count="stats.total"
        :icon="`user`"
        :bg_color="`blue`"
        :icon_color="`green`"
      />
      <Card
        :title="`Mobile App Users`"
        :count="stats.mobile_users"
        :icon="`mobile-android-alt`"
        :bg_color="`green`"
        :icon_color="`blue`"
      />
      <Card
        :title="`Blocked Users`"
        :count="stats.blocked"
        :icon="`remove`"
        :bg_color="`red`"
        :icon_color="`red`"
      />
    </div>

    <!-- Table -->
    <div class="bg-white rounded shadow">
      <div class="p-4 border-b flex justify-between">
        <h1 class="font-bold">System Users</h1>
        <button
          @click="downloadExcel"
          class="flex items-center p-2 rounded bg-green-600 text-white font-medium hover:bg-green-700"
        >
          <font-awesome-icon icon="file-excel" class="text-xl mr-1" />
        </button>
      </div>
      <Table
        :headers="['ID', 'Name', 'Gender', 'Address', 'Info', 'Status']"
        :data="users"
        :actions="['view', 'edit', 'block']"
        :perPage="3"
        @block="handleBlock"
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
import { statisticsService, userService } from '@/services'
import Spinner from '@/components/Spinner.vue'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

const users = ref([
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '968453150',
    name: 'Mohammed Ali',
    gender: 'male',
    address: 'Gaza, Alnosirate, Block 1',
    info: null,
    status: 'Blocked',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: { blood_type: 'A+' },
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: null,
    status: 'Active',
  },
  {
    id: '968453150',
    name: 'Mohammed Ali',
    gender: 'male',
    address: 'Gaza, Alnosirate, Block 1',
    info: null,
    status: 'Blocked',
  },
  {
    id: '960135824',
    name: 'John Smith',
    gender: 'male',
    address: 'Gaza, Gaza city, Altofah',
    info: { blood_type: 'AB-' },
    status: 'Active',
  },
  {
    id: '912852963',
    name: 'John Doo',
    gender: 'Male',
    address: 'Gaza, Gaza city, Alremal',
    info: null,
    status: 'Active',
  },
  {
    id: '402315487',
    name: 'Sara Ali',
    gender: 'Female',
    address: 'Gaza, Gaza city, Tal-Alhawa',
    info: null,
    status: 'Active',
  },
  {
    id: '960135824',
    name: 'mohammed Ahmed',
    gender: 'male',
    address: 'Gaza, Dearalbalh, Alberka',
    info: null,
    status: 'Active',
  },
])

// Statistics
const stats = ref({
  total: 11568,
  mobile_users: 1578,
  blocked: 180,
})

// Handel user bloking
function handleBlock(row) {
  confirmDialog(
    'Are you sure you want to block member #' + row.id + '?',
    "You won't be able to undo this!",
  ).then((result) => {
    if (result.isConfirmed) {
      // Call Laravel API here
      if (false) {
        successAlert('Blocked!', 'Your item has been blocked.')
      } else {
        errorAlert('Failed!', 'Your item has Not been blocked.')
      }
    }
  })
}
// File exportation
const { exportToExcel, exportJsonToExcel, exportToCSV } = useFileGenerator()
const downloadExcel = () => {
  // Convert to plain JS array of objects (deep clone)
  const plainData = users.value.map((e) => ({ ...e }))

  exportToExcel(plainData, 'users', 'users', null, true)
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
    const [userResponse, countsResponse] = await Promise.all([
      userService.getUsers(),
      statisticsService.getCounts(),
    ])
    users.value = usersResponse.data
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
