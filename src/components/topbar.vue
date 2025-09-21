<template>
  <!-- Top Bar -->
  <header class="bg-white p-4 border-b space-x-4">
    <div class="flex justify-between items-center">
      <div></div>
      <form class="w-96 flex items-center relative">
        <input
          type="search"
          placeholder="Search Here..."
          class="mt-1 w-[100%] border shadow rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <font-awesome-icon
          icon="search"
          class="absolute right-4 text-blue-500 hover:text-red-500"
        />
      </form>
      <div class="flex justify-between items-center gap-5">
        <!-- Notifications -->
        <Notifications :notifications="notifications" @clear="clearNotifications" />
        <UserMenu username="Hamza Albaghdady" />
        <img :src="pic" alt="User" class="w-8 h-8 rounded-full border" />
      </div>
    </div>
  </header>
</template>

<script setup>
import pic from '@/assets/images/admin.jpg'
import Notifications from '@/components/Notifications.vue'
import UserMenu from '@/components/UserMenu.vue'
import { ref } from 'vue'

const notifications = ref([
  'New emergency requested',
  'Ambulance 548 is available now',
  'System maintenance scheduled',
  'New emergency requested',
  'New emergency requested',
])

function clearNotifications() {
  notifications.value = []
}
</script>
