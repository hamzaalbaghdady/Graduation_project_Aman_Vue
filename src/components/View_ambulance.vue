<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="pb-6 flex items-center justify-between">
      <!-- Page Title -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Ambulance Management <span class="text-sm text-gray-500">Ambulance #A13245157</span>
      </h2>
      <RouterLink
        to="/emergencies/edit"
        class="px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-lg flex items-center gap-2"
        >Update Status</RouterLink
      >
    </div>

    <!-- Card -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-6 w-max mx-auto">
      <!-- Request Details -->
      <section>
        <h3 class="text-lg font-medium mb-2">Ambulance Details</h3>
        <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span class="font-semibold">Ambulance ID:</span> A13245157</p>
          <p><span class="font-semibold">Driver ID:</span> 453258698</p>
          <p><span class="font-semibold">Ambulance Brand:</span> Mercedise</p>
          <p><span class="font-semibold">Driver Name:</span> John Doo</p>
          <p><span class="font-semibold">Ambulance Model:</span> Amp car 2021</p>
          <p><span class="font-semibold">Driver Phone:</span> 0599658754</p>

          <p><span class="font-semibold">Location:</span> 123 Main St, Downtown</p>
          <p>
            <span class="font-semibold">status:</span>
            <span class="text-blue-600 font-bold"> Assigned</span>
          </p>
          <p><span class="font-semibold">Created:</span> Jan 15, 2025 12:23pm</p>
          <p><span class="font-semibold">Updated at:</span> Jan 15, 2025 12:30pm</p>
          <p><span class="font-semibold">Crew Size:</span> 3</p>
          <p><span class="font-semibold">Channle:</span> 6</p>
        </div>
        <p class="mt-3 text-sm text-gray-700">
          <span class="font-semibold">Crew Members:</span> {[ID:123654898, Name: John Doo],
          [ID:852741963, Name: John Doo], [ID:865432179, Name: John Doo]}
        </p>
        <p class="mt-3 text-gray-600">
          <span class="font-semibold">Notes:</span> Need new laptop setup for remote work. Current
          device is running slowly and affecting productivity.
        </p>
      </section>

      <hr />

      <!-- Update Status -->
      <section>
        <h3 class="text-lg font-medium mb-3">Update Ambulance Status</h3>
        <form @submit.prevent="handleSubmit" class="flex gap-5">
          <select class="border rounded-lg p-2 w-[75%] h-[100%]">
            <option>Select status</option>
            <option>Assigned</option>
            <option>Free</option>
            <option>Fuel</option>
            <option>Fix</option>
          </select>
          <button class="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg w-[20%]">
            <font-awesome-icon icon="check" />Update
          </button>
        </form>
      </section>

      <hr />

      <!-- Activity Log -->
      <section>
        <h3 class="text-lg font-medium mb-2">Activity Log</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li>
            <span class="font-medium text-gray-800">Ambulance Assigned</span> by John Smith
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 09:30 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Status changed to Free</span>
            by John Smith
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 10:15 AM</span>
          </li>
          <li>
            <span class="font-medium text-gray-800">Status changed to Fuel</span>
            by Sarah Johnson
            <span class="ml-2 text-gray-400">Jan 15, 2025 - 02:45 PM</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
