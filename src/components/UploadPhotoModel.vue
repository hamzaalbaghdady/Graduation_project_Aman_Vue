<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <!-- Modal -->
      <transition name="scale">
        <div v-if="isOpen" class="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
          <!-- Close button -->
          <button
            @click="close"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <font-awesome-icon :icon="['fas', 'times']" size="lg" />
          </button>

          <!-- Title -->
          <h2 class="text-xl font-bold text-gray-800 mb-2 text-center">Upload New Photo</h2>
          <p class="text-sm text-gray-500 text-center mb-6">
            Select an image from your device to update your profile picture.
          </p>

          <!-- Upload form -->
          <form @submit.prevent="submitForm" class="space-y-5">
            <!-- File input -->
            <label
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:border-indigo-400 transition bg-gray-50"
            >
              <input type="file" accept="image/*" @change="handleFileChange" class="hidden" />
              <font-awesome-icon
                :icon="['fas', 'cloud-upload-alt']"
                class="text-3xl text-indigo-500 mb-2"
              />
              <span class="text-gray-600 text-sm">Click to upload or drag & drop</span>
            </label>

            <!-- Preview -->
            <div v-if="previewUrl" class="text-center">
              <p class="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                :src="previewUrl"
                alt="Preview"
                class="w-32 h-32 rounded-xl object-cover border mx-auto"
              />
            </div>

            <!-- Buttons -->
            <div class="flex justify-end gap-3 pt-2">
              <button
                type="button"
                @click="close"
                class="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'uploaded'])

const file = ref(null)
const previewUrl = ref(null)

function handleFileChange(event) {
  file.value = event.target.files[0]
  if (file.value) {
    previewUrl.value = URL.createObjectURL(file.value)
  }
}

function close() {
  emit('close')
  previewUrl.value = null
  file.value = null
}

function submitForm() {
  if (!file.value) return alert('Please select a file first')
  emit('uploaded', file.value)
  close()
}
</script>

<style scoped>
/* Fade for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale for modal */
.scale-enter-active,
.scale-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
