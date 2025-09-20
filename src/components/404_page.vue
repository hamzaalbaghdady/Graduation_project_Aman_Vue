<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
    <font-awesome-icon icon="ambulance" class="mr-3 text-9xl" />
    <h1 class="text-6xl font-bold text-red-600">404</h1>
    <h2 class="text-2xl font-semibold text-gray-800 mt-2">Emergency Not Found!</h2>
    <p class="text-gray-600 mt-4">
      Our ambulance got lost trying to reach this page.<br />
      Maybe the siren was too loud to hear your request...
    </p>
    <RouterLink
      to="/"
      class="mt-6 px-6 py-3 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
    >
      Return to Dashboard
    </RouterLink>
  </div>
</template>
