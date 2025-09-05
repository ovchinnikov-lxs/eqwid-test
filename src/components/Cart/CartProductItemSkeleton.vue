<template>
  <li
    class="flex gap-3 p-3"
    aria-busy="true"
  >
    <div
      class="relative h-25 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      <div class="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
    </div>

    <div class="min-w-0 flex-1">
      <div class="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
      <div class="mt-2 flex items-center gap-2">
        <div class="h-4 w-10 rounded bg-gray-200 animate-pulse" />
        <div class="inline-flex items-center rounded-lg border border-gray-300 px-1.5 py-1">
          <div class="h-4 w-5 rounded bg-gray-200 animate-pulse" />
          <div class="mx-2 h-4 w-12 rounded bg-gray-200 animate-pulse" />
          <div class="h-4 w-5 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
      <div class="mt-2 h-4 w-20 rounded bg-gray-200 animate-pulse" />
    </div>

    <div class="flex items-start">
      <div class="h-8 w-20 rounded-xl bg-gray-200 animate-pulse" />
    </div>
  </li>
</template>
