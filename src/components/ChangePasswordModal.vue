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
          <h2 class="text-xl font-bold text-gray-800 mb-2 text-center">Change Password</h2>
          <p class="text-sm text-gray-500 text-center mb-6">
            Update your account password for better security.
          </p>

          <!-- Change password form -->
          <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Current Password -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1"> Current Password </label>
              <input
                v-model="form.currentPassword"
                :type="showCurrent ? 'text' : 'password'"
                required
                class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter current password"
              />
              <button
                type="button"
                @click="showCurrent = !showCurrent"
                class="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <font-awesome-icon :icon="showCurrent ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
              </button>
            </div>

            <!-- New Password -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1"> New Password </label>
              <input
                v-model="form.newPassword"
                :type="showNew ? 'text' : 'password'"
                required
                minlength="6"
                class="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter new password"
              />
              <button
                type="button"
                @click="showNew = !showNew"
                class="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <font-awesome-icon :icon="showNew ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
              </button>

              <!-- Strength Meter -->
              <div v-if="form.newPassword" class="mt-2">
                <div class="flex justify-between text-xs font-medium">
                  <span :class="strengthColor">{{ passwordStrength.label }}</span>
                  <span class="text-gray-400">{{ passwordStrength.score }}/4</span>
                </div>
                <div class="w-full h-2 rounded bg-gray-200 mt-1">
                  <div
                    class="h-2 rounded"
                    :class="strengthBarColor"
                    :style="{ width: (passwordStrength.score / 4) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                v-model="form.confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                required
                :class="[
                  'w-full px-4 py-2 border rounded-xl focus:ring-2 focus:outline-none',
                  confirmPasswordError
                    ? 'border-red-500 focus:ring-red-400'
                    : 'focus:ring-indigo-400',
                ]"
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                @click="showConfirm = !showConfirm"
                class="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                <font-awesome-icon :icon="showConfirm ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
              </button>

              <!-- Error Message -->
              <p v-if="confirmPasswordError" class="text-xs text-red-500 mt-1">
                Passwords do not match
              </p>
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
                :disabled="passwordStrength.score < 2 || confirmPasswordError"
                class="px-4 py-2 rounded-xl shadow-sm transition text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'passwordChanged'])

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Toggles for showing passwords
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

// Password strength logic
const passwordStrength = computed(() => {
  const pwd = form.value.newPassword
  let score = 0

  if (pwd.length >= 6) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  let label = 'Weak'
  if (score === 2) label = 'Medium'
  if (score === 3) label = 'Strong'
  if (score === 4) label = 'Very Strong'

  return { score, label }
})

const strengthColor = computed(() => {
  switch (passwordStrength.value.score) {
    case 1:
      return 'text-red-500'
    case 2:
      return 'text-yellow-500'
    case 3:
      return 'text-green-500'
    case 4:
      return 'text-indigo-600'
    default:
      return 'text-gray-400'
  }
})

const strengthBarColor = computed(() => {
  switch (passwordStrength.value.score) {
    case 1:
      return 'bg-red-500'
    case 2:
      return 'bg-yellow-500'
    case 3:
      return 'bg-green-500'
    case 4:
      return 'bg-indigo-600'
    default:
      return 'bg-gray-300'
  }
})

// Confirm password validation
const confirmPasswordError = computed(() => {
  return form.value.confirmPassword && form.value.confirmPassword !== form.value.newPassword
})

function close() {
  emit('close')
  form.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
}

function submitForm() {
  if (confirmPasswordError.value) {
    alert('Passwords do not match!')
    return
  }
  emit('passwordChanged', form.value)
  close()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
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
