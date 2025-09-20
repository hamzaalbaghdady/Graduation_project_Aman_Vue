<template>
  <div class="flex bg-gray-50">
    <Sidebar />
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <Topbar />
      <div class="flex-1 flex flex-col">
        <RouterView />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/navbar.vue'
import Topbar from '@/components/topbar.vue'
import Main from '@/components/dashboard_main.vue'
import Footer from '@/components/footer.vue'
import { RouterView } from 'vue-router'
</script>
