<template>
  <div class="p-4">
    <!-- Table -->
    <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100">
        <tr>
          <!-- Normal headers -->
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
          >
            {{ header }}
          </th>

          <!-- Extra Actions column -->
          <th
            v-if="actions && actions.length"
            class="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="hover:bg-gray-50">
          <!-- Data columns -->
          <td
            v-for="(header, colIndex) in headers"
            :key="colIndex"
            :class="
              header.toLowerCase() === 'status'
                ? statusClass(row[header.toLowerCase()])
                : 'px-4 py-2 text-sm text-gray-600 border-b'
            "
          >
            {{ row[header.toLowerCase()] }}
          </td>

          <!-- Dynamic actions column -->
          <td
            v-if="actions && actions.length"
            class="px-4 py-2 text-sm text-gray-600 border-b flex gap-2"
          >
            <template v-for="action in actions" :key="action">
              <router-link v-if="action === 'view'" :to="`${myRoute}/${row.id}`">
                <font-awesome-icon icon="eye" class="text-xl text-green-500 hover:text-green-800" />
              </router-link>

              <router-link
                v-else-if="action === 'edit'"
                :to="link !== '' ? link + row.id : `${myRoute}/${row.id}`"
              >
                <font-awesome-icon icon="edit" class="text-xl text-blue-500 hover:text-blue-800" />
              </router-link>

              <button v-else-if="action === 'delete'" @click="$emit('delete', row)">
                <font-awesome-icon
                  icon="trash-alt"
                  class="text-xl text-red-500 hover:text-red-800"
                />
              </button>

              <button v-else-if="action === 'block'" @click="$emit('block', row)">
                <font-awesome-icon icon="remove" class="text-xl text-red-500 hover:text-red-800" />
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
      <p>
        Showing {{ startIndex + 1 }} to {{ Math.min(startIndex + perPage, data.length) }} of
        {{ data.length }} results
      </p>

      <div class="flex gap-1">
        <!-- Prev -->
        <button
          class="px-3 py-1 border rounded-lg disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Prev
        </button>

        <!-- Page numbers -->
        <button
          v-for="page in totalPages"
          :key="page"
          class="px-3 py-1 border rounded-lg"
          :class="page === currentPage ? 'bg-indigo-600 text-white' : ''"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- Next -->
        <button
          class="px-3 py-1 border rounded-lg disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

let myRoute = useRoute().path
if (myRoute === '/' || myRoute === '/sos') {
  myRoute = 'emergencies'
}

const props = defineProps({
  headers: { type: Array, required: true },
  data: { type: Array, required: true },
  perPage: { type: Number, default: 5 },
  actions: { type: Array, default: () => [] }, // ['view', 'edit', 'delete', 'block']
  link: { type: String, required: false, default: '' },
})

const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(props.data.length / props.perPage))

const startIndex = computed(() => (currentPage.value - 1) * props.perPage)

const paginatedData = computed(() => {
  const start = startIndex.value
  return props.data.slice(start, start + props.perPage)
})

function goToPage(page) {
  currentPage.value = page
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// Test
const statusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'px-4 py-2 text-sm text-yellow-400 border-b'
    case 'Fuel':
      return 'px-4 py-2 text-sm text-yellow-400 border-b'
    case 'Off Duty':
      return 'px-4 py-2 text-sm text-yellow-400 border-b'
    case 'Assigned':
      return 'px-4 py-2 text-sm text-blue-600 border-b'
    case 'On Duty':
      return 'px-4 py-2 text-sm text-blue-600 border-b'
    case 'Completed':
      return 'px-4 py-2 text-sm text-green-600 border-b'
    case 'Free':
      return 'px-4 py-2 text-sm text-green-600 border-b'
    case 'Active':
      return 'px-4 py-2 text-sm text-green-600 border-b'
    case 'Canceled':
      return 'px-4 py-2 text-sm text-red-600 border-b'
    case 'Inactive':
      return 'px-4 py-2 text-sm text-red-600 border-b'
    case 'Blocked':
      return 'px-4 py-2 text-sm text-red-600 border-b'
    default:
      return 'px-4 py-2 text-sm text-gray-600 border-b'
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
