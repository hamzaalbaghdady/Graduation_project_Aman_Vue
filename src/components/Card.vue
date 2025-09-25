<template>
  <div :class="`bg-${props.bg_color}-100 p-6 rounded shadow flex items-center justify-between`">
    <div>
      <p class="text-gray-500">{{ props.title }}</p>
      <p class="text-2xl font-bold">{{ props.count }}</p>
    </div>
    <font-awesome-icon :icon="props.icon" :class="`text-2xl text-${props.icon_color}-500`" />
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Status Card',
    required: true,
  },
  icon: {
    type: String,
    default: 'eye',
    required: false,
  },
  count: {
    type: Number,
    default: 0,
    required: false,
  },
  icon_color: {
    type: String,
    default: 'gray-500',
    required: false,
  },
  bg_color: {
    type: String,
    default: 'white',
    required: false,
  },
})
</script>
