<template>
  <div class="relative">
    <!-- Bell Button -->
    <button
      @click="toggle"
      class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
    >
      <font-awesome-icon icon="bell" class="text-xl text-blue-500 hover:text-blue-800" />
      <span
        v-if="notifications.length"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full"
      >
        {{ notifications.length }}
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <div class="p-3 border-b text-sm font-semibold text-gray-700">Notifications</div>

      <ul class="max-h-60 overflow-y-auto">
        <li
          v-for="(notification, index) in notifications"
          :key="index"
          class="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          {{ notification }}
        </li>
      </ul>

      <div v-if="!notifications.length" class="p-3 text-sm text-gray-400">No notifications</div>

      <div class="p-2 border-t text-center">
        <button class="text-xs text-indigo-600 hover:underline" @click="clear">Clear all</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['clear'])

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}

function clear() {
  emit('clear')
  isOpen.value = false
}

// Close on outside click
function handleClickOutside(event) {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
