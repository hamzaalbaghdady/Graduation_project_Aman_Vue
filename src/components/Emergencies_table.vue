<!-- Table -->
<template>
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
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/table.vue'
import { useFileGenerator } from '@/composables/fileGenerator'
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

const { exportToExcel, exportJsonToExcel, exportToCSV } = useFileGenerator()
const downloadExcel = () => {
  // Convert to plain JS array of objects (deep clone)
  const plainData = emergencies.value.map((e) => ({ ...e }))

  exportToExcel(plainData, 'emergencies', 'emergencies', null, true)
    .then(() => console.log('Excel exported'))
    .catch((err) => console.error(err))
}
</script>
