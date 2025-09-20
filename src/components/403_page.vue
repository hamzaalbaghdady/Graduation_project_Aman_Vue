<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
    <img src="" alt="Access Denied" class="w-60 mb-6" />
    <h1 class="text-6xl font-bold text-yellow-500">403</h1>
    <h2 class="text-2xl font-semibold text-gray-800 mt-2">Access Denied</h2>
    <p class="text-gray-600 mt-4">
      Whoops! You don’t have clearance for this zone.<br />
      Step back before the sirens go off!
    </p>
    <RouterLink
      to="/"
      class="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition"
    >
      Back to Safety (Dashboard)
    </RouterLink>
  </div>
</template>
