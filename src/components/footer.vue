<template>
  <footer>
    <div class="m-3">
      <p class="text-sm text-gray-500 mx-auto text-center">
        Made with <font-awesome-icon icon="heart" class="text-sm text-red-600" /> by IUG students,
        All Rights Reserved {{ currentYear }}.
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
