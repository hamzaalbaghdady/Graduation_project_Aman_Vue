<template>
  <div class="p-6 bg-gray-50 min-h-screen space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <img :src="pic" alt="Profile" class="w-20 h-20 rounded-full border" />
      <div>
        <h2 class="text-xl font-semibold text-gray-800">John Doe</h2>
        <p class="text-gray-500">john.doe@example.com</p>
        <button @click="isModal1Open = true" class="text-sm text-indigo-600 hover:underline mt-1">
          Change Photo
        </button>
        <!-- Modal -->
        <UploadPhotoModal
          :isOpen="isModal1Open"
          @close="isModal1Open = false"
          @uploaded="handleUpload"
        />
      </div>
    </div>

    <!-- Personal Information -->
    <div class="bg-white rounded-xl shadow p-6">
      <h3 class="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>
      <div class="grid grid-cols-2 gap-4">
        <input type="text" placeholder="First Name" value="John" class="border rounded-lg p-2" />
        <input type="text" placeholder="Last Name" value="Doe" class="border rounded-lg p-2" />
      </div>
      <input
        type="email"
        placeholder="Email Address"
        value="john.doe@example.com"
        class="mt-4 border rounded-lg p-2 w-full"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value="+1 (555) 123-4567"
        class="mt-4 border rounded-lg p-2 w-full"
      />
      <button class="mt-4 px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800">
        Save Changes
      </button>
    </div>

    <!-- Security -->
    <div class="bg-white rounded-xl shadow p-6">
      <h3 class="text-lg font-medium text-gray-800 mb-4">Security</h3>
      <div class="flex justify-between items-center py-2 border-b">
        <div>
          <p class="text-gray-700">Password</p>
          <p class="text-sm text-gray-500">Last updated 3 months ago</p>
        </div>
        <button
          @click="isModal2Open = true"
          class="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Change Password
        </button>
        <!-- Modal -->
        <ChangePasswordModal
          :isOpen="isModal2Open"
          @close="isModal2Open = false"
          @passwordChanged="handlePasswordChanged"
        />
      </div>
      <div class="flex justify-between items-center py-2">
        <div>
          <p class="text-gray-700">Two-Factor Authentication</p>
          <p class="text-sm text-gray-500">Add an extra layer of security</p>
        </div>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="auth_enabled" class="sr-only peer" />

          <div
            class="w-11 h-6 bg-gray-200 rounded-full relative transition-colors peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-transform peer-checked:after:translate-x-5"
          ></div>
        </label>
      </div>
    </div>

    <!-- Appearance -->
    <div class="bg-white rounded-xl shadow p-6">
      <h3 class="text-lg font-medium text-gray-800 mb-4">Appearance</h3>
      <div class="flex justify-between items-center py-2 border-b">
        <p class="text-gray-700">Dark Mode</p>

        <label class="inline-flex items-center cursor-pointer">
          <input @click="toggleDark()" type="checkbox" v-model="dm_enabled" class="sr-only peer" />

          <div
            class="w-11 h-6 bg-gray-200 rounded-full relative transition-colors peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-transform peer-checked:after:translate-x-5"
          ></div>
        </label>
      </div>
      <div class="py-3">
        <p class="text-gray-700 mb-2">Accent Color</p>
        <div class="flex gap-3">
          <span class="w-8 h-8 rounded-full bg-gray-800 cursor-pointer"></span>
          <span class="w-8 h-8 rounded-full bg-indigo-600 cursor-pointer"></span>
          <span class="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"></span>
          <span class="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></span>
          <span class="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></span>
        </div>
      </div>
    </div>

    <!-- Account Actions -->
    <div class="bg-white rounded-xl shadow p-6 space-y-3">
      <button class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 w-full text-left">
        <font-awesome-icon icon="download" /> Export Data
      </button>
      <button class="flex items-center gap-2 text-red-600 hover:text-red-700 w-full text-left">
        <font-awesome-icon icon="trash" /> Delete Account
      </button>
      <button class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 w-full text-left">
        <font-awesome-icon icon="right-from-bracket" /> Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import pic from '@/assets/images/admin.jpg'
import { ref } from 'vue'
import UploadPhotoModal from '@/components/UploadPhotoModel.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal.vue'

const auth_enabled = ref(true)
const dm_enabled = ref(true)

const isModal1Open = ref(false)

function handleUpload(file) {
  console.log('File received in parent:', file)
  // Upload to Laravel backend here via fetch/axios
}

const isModal2Open = ref(false)

function handlePasswordChanged(data) {
  console.log('Password changed:', data)

  // 🔹 here you can call your API to update password in backend
  // e.g. axios.post('/api/change-password', data)

  alert('Password updated successfully!')
}
</script>
