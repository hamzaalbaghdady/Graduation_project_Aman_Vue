<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isActiveLink = (path) => {
  return route.path.startsWith(path)
}
const activeClass = 'flex items-center p-2 rounded bg-indigo-600 text-white font-medium'
const unactiveClass = 'flex items-center p-2 rounded hover:bg-indigo-200'
</script>
<template>
  <!-- Sidebar -->
  <aside class="w-55 bg-white border-r flex flex-col">
    <div class="p-3 flex items-center space-x-2 border-b">
      <span class="p-[6px] text-xl font-bold">Dashboard</span>
    </div>
    <nav class="flex-1 p-4 space-y-1 text-gray-700">
      <RouterLink to="/" :class="route.path === '/' ? activeClass : unactiveClass"
        ><font-awesome-icon icon="tachometer-alt" class="mr-3" />Dashboard</RouterLink
      >
      <RouterLink to="/users" :class="isActiveLink('/users') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="user-group" class="mr-3" /> Users Managment</RouterLink
      >
      <RouterLink
        to="/ambulances"
        :class="isActiveLink('/ambulances') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="ambulance" class="mr-3" /> Ambulances</RouterLink
      >
      <RouterLink
        to="/emergencies"
        :class="isActiveLink('/emergencies') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="exclamation-triangle" class="mr-3" />Emergencies</RouterLink
      >
      <RouterLink
        to="/dispatchers"
        :class="isActiveLink('/dispatchers') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="headset" class="mr-3" />Dispatcher</RouterLink
      >
      <RouterLink
        to="/drivers-crews"
        :class="isActiveLink('/drivers-crews') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="people-group" class="mr-3" />Drivers & Crews</RouterLink
      >
      <RouterLink
        to="/roles-permissions"
        :class="isActiveLink('/roles-permissions') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="shield-alt" class="mr-3" />Roles & Permissions</RouterLink
      >
      <RouterLink to="/reports" :class="isActiveLink('/reports') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="chart-bar" class="mr-3" />Reports & Statistics</RouterLink
      >
      <RouterLink to="/profile" :class="isActiveLink('/profile') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="user" class="mr-3" /> Profile</RouterLink
      >
      <RouterLink to="/history" :class="isActiveLink('/history') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="history" class="mr-3" /> History</RouterLink
      >
      <RouterLink to="/log" :class="isActiveLink('/log') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="list-alt" class="mr-3" /> System log</RouterLink
      >
      <RouterLink to="/sos" :class="isActiveLink('/sos') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="eye" class="mr-3" /> SOS Monitoring</RouterLink
      >
      <RouterLink to="/settings" :class="isActiveLink('/settings') ? activeClass : unactiveClass"
        ><font-awesome-icon icon="cog" class="mr-3" />Settings</RouterLink
      >
    </nav>
  </aside>
</template>
