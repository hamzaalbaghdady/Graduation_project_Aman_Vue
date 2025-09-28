<template>
  <div class="p-8 bg-gray-50 min-h-screen space-y-8">
    <!-- Header -->
    <div class="pb-6 items-center justify-between">
      <h1 class="text-3xl">Role & Permission Management</h1>
      <h3 class="text-gray-600">Manage user roles and their associated permissions</h3>
    </div>

    <!-- User Roles Table -->
    <div class="bg-white rounded-xl shadow p-6">
      <div class="pb-6 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-medium text-gray-800 mb-4">User Roles</h2>
          <p class="text-sm text-gray-500 mb-6">Configure permissions for each role</p>
        </div>
        <div>
          <RouterLink
            to="/roles-permissions/role/add"
            class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
            ><font-awesome-icon icon="plus" class="mr-1" /> Add new Role</RouterLink
          >
        </div>
      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-left text-sm text-gray-600 border-b">
            <th class="p-3">Role</th>
            <th class="p-3">Description</th>
            <th class="p-3">Permissions</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <!-- Roles -->
          <tr class="border-b" v-for="role in roles">
            <td class="p-3 font-medium items-center gap-2">
              {{ role.name }}
            </td>
            <td class="p-3 text-gray-600">{{ role.description }}</td>
            <td v-for="permission in permissions" :key="permission.id" class="flex flex-col">
              <div class="flex items-center justify-between">
                <label :for="`cb_r${role.id}p${permission.id}`" class="ms-2 text-sm text-black">{{
                  permission.title
                }}</label>
                <input
                  :id="`cb_r${role.id}p${permission.id}`"
                  type="checkbox"
                  v-model="role.permissions"
                  :value="permission.id"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </td>
            <td class="text-center">
              <router-link :to="`roles-permissions/role/edit/${role.id}`">
                <font-awesome-icon icon="edit" class="text-xl text-blue-500 hover:text-blue-800" />
              </router-link>

              <button @click="deleteRole(role)">
                <font-awesome-icon
                  icon="trash-alt"
                  class="text-xl text-red-500 hover:text-red-800"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Actions -->
      <div class="flex justify-end gap-3 mt-5">
        <button
          @click="cancel"
          class="px-4 py-2 border rounded-lg text-white bg-red-400 hover:bg-red-600"
        >
          <font-awesome-icon icon="xmark" /> Cancel
        </button>
        <button
          @click="save"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <font-awesome-icon icon="floppy-disk" /> Save Changes
        </button>
      </div>
    </div>

    <!-- Permission Details -->
    <div class="bg-white rounded-xl shadow p-6">
      <div class="pb-6 flex items-center justify-between">
        <div>
          <h2 class="text-lg font-medium text-gray-800 mb-4">Permission Details</h2>
          <p class="text-sm text-gray-500 mb-6">Detailed description of each permission</p>
        </div>
        <div>
          <RouterLink
            to="/roles-permissions/permission/add"
            class="flex items-center p-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-800"
            ><font-awesome-icon icon="plus" class="mr-1" /> Add new Permission</RouterLink
          >
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div v-for="permission in permissions" class="flex justify-between items-start gap-2">
          <div>
            <p class="font-medium">{{ permission.title }}</p>
            <p class="text-gray-500">{{ permission.description }}</p>
          </div>
          <div class="flex flex-col">
            <router-link :to="`/roles-permissions/permission/edit/${permission.id}`">
              <font-awesome-icon
                icon="edit"
                class="text-xl text-blue-500 hover:text-blue-800 mb-1"
              />
            </router-link>
            <button @click="deletePermission(permission)">
              <font-awesome-icon icon="trash-alt" class="text-xl text-red-500 hover:text-red-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAlert } from '@/composables/useAlert'

const { confirmDialog, successAlert, errorAlert, infoAlert } = useAlert()

const roles = reactive([
  {
    id: 1,
    name: 'Admin',
    description: 'Complete system administration privileges',
    permissions: [1, 3, 4, 5, 6],
  },
  {
    id: 2,
    name: 'Dispatcher',
    description: 'Handle emergency calls and dispatch ambulances',
    permissions: [1, 2],
  },
])

const permissions = reactive([
  {
    id: 1,
    title: 'View SOS',
    description: 'Access to view emergency SOS requests and their status',
  },
  {
    id: 2,
    title: 'Assign Ambulance',
    description: 'Ability to assign ambulances to emergency requests',
  },
  {
    id: 3,
    title: 'Reports',
    description: 'Generate and view system reports and analytics',
  },
  {
    id: 4,
    title: 'Manage Users',
    description: 'Create, edit, and delete user accounts and profiles',
  },
  {
    id: 5,
    title: 'System Settings',
    description: 'Access to system configuration and settings',
  },
  {
    id: 6,
    title: 'Manage Ambulances',
    description: 'Create, edit, and delete ambulances',
  },
])

function deletePermission(permission) {
  confirmDialog(
    'Are you sure you want to delete permission #' + permission.id + '?',
    "You won't be able to undo this!",
  ).then((result) => {
    if (result.isConfirmed) {
      // Call Laravel API here
      if (true) {
        successAlert('Deleted!', 'Your item has been deleted.')
      } else {
        errorAlert('Failed!', 'Your item has Not been deleted.')
      }
    }
  })
}

function deleteRole(role) {
  confirmDialog(
    'Are you sure you want to delete <b>' + role.name + '</b> role?',
    "You won't be able to undo this!",
  ).then((result) => {
    if (result.isConfirmed) {
      // Call Laravel API here
      if (true) {
        successAlert('Deleted!', 'Your item has been deleted.')
      } else {
        errorAlert('Failed!', 'Your item has Not been deleted.')
      }
    }
  })
}

const save = () => {
  console.log('Roles data:', roles)
  // Laravel API
  if (true) {
    successAlert('Saved!', 'Your data has been saved.')
  } else {
    errorAlert('Failed!', 'Something went wrong, try again later.')
  }
}
const cancel = () => {
  confirmDialog('Your changes will be discard', 'Are you sure you want to proceed?')
}
</script>
