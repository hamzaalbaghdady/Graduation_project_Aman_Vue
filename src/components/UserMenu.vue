<template>
  <div class="relative inline-block text-left">
    <!-- Username button -->
    <button
      @click="toggle"
      class="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
    >
      <span class="font-medium text-gray-700">{{ username }}</span>
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-gray-500" />
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <ul class="py-1 text-sm text-gray-700">
        <li>
          <RouterLink to="/profile" class="block px-4 py-2 hover:bg-gray-100" @click="close">
            Profile
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/settings" class="block px-4 py-2 hover:bg-gray-100" @click="close">
            Settings
          </RouterLink>
        </li>
        <li>
          <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const props = defineProps({
  username: {
    type: String,
    default: 'User',
  },
})

const router = useRouter()
const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
function close() {
  isOpen.value = false
}
function logout() {
  close()
  // Example logout logic:
  localStorage.removeItem('token')
  router.push('/login')
}

// Close dropdown if user clicks outside
function handleClickOutside(event) {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) isOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
