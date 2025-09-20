<!-- Table -->
<template>
  <div class="bg-white rounded shadow">
    <div class="p-4 border-b font-bold">Live SOS Requests</div>
    <Table
      :headers="['ID', 'Civilian_id', 'Time', 'Location', 'status', 'Priority']"
      :data="emergencies"
      :actions="['view', 'edit']"
      :perPage="5"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/table.vue'

const emergencies = ref([
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E202210204',
    civilian_id: '865932547',
    time: '20 min ago',
    location: '654 Cedar Blvd, Westside',
    status: 'Canceled',
    priority: 'Low',
  },
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202536985',
    civilian_id: '453258698',
    time: '2 min ago',
    location: '123 Main St, Downtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E202354867',
    civilian_id: '256987452',
    time: '10 min ago',
    location: '456 Oak Ave, Midtown',
    status: 'Assigned',
    priority: 'High',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E201900457',
    civilian_id: '952876528',
    time: '5 min ago',
    location: '789 Pine Rd, Uptown',
    status: 'Pending',
    priority: 'medium',
  },
  {
    id: 'E201901548',
    civilian_id: '936528741',
    time: '7 min ago',
    location: '321 Elm St, Eastside',
    status: 'Completed',
    priority: 'Low',
  },
  {
    id: 'E202210204',
    civilian_id: '865932547',
    time: '20 min ago',
    location: '654 Cedar Blvd, Westside',
    status: 'Canceled',
    priority: 'Low',
  },
])

const statusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-gray-100 text-gray-600'
    case 'Assigned':
      return 'bg-blue-100 text-blue-600'
    case 'Completed':
      return 'bg-green-100 text-green-600'
    case 'canceld':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const priorityClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-gray-600'
    case 'medium':
      return 'bg-blue-100 text-blue-600'
    case 'Low':
      return 'bg-green-100 text-green-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}
</script>
