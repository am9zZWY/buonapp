<template>
  <header
    class="max-w-screen sticky top-0 z-10 bg-blend-darken">
    <div class="max-w-screen-lg m-auto my-4 py-3">
      <div class="mx-auto flex justify-between items-center">
        <!-- Logo -->
        <h1
          class="text-2xl font-bold underline decoration-wavy decoration-from-font underline-offset-8"
        >
          <NuxtLink to="/">Buonapp</NuxtLink>
        </h1>

        <!-- Call to Action Buttons -->
        <div>
          <NuxtLink class="font-serif" to="/buon/giorno">Hi there! 👋</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup></script>
