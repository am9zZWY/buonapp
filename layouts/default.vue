<template>
  <main>
    <Header :user="user" @login="onLogin" @logout="onLogout" @create-account="onCreateAccount" />
    <SpeedInsights />

    <div class="max-w-screen-lg mx-auto relative">
      <slot />
      <ClientOnly>
        <PwaButton />
      </ClientOnly>

      <!-- Floating Island -->
      <div
        class="floating-island p-3 rounded-3xl bg-neutral-100 dark:bg-neutral-600 shadow-2xl items-center">
        <button class="rounded-2xl p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700" @click="onAddTodo">
          <UIcon name="ri:add-line" dynamic />
        </button>
        <div class="mx-2 h-8 bg-gray-300 dark:bg-white w-px" />
        <button class="rounded-2xl p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700" @click="onViewTodos">
          <UIcon name="ri:todo-line" dynamic />
        </button>
        <div class="mx-2 h-8 bg-gray-300 dark:bg-white w-px" />
        <button class="rounded-2xl p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700" @click="onSettings">
          <UIcon name="ri:settings-5-line" dynamic />
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const onLogin = () => userStore.login('Josef')
const onLogout = () => userStore.logout()
const onCreateAccount = () => userStore.createAccount('Josef', '123@123.de')

const onAddTodo = () => {
  // Add your add todo logic here
}

const onViewTodos = () => {
  // Add your view todos logic here
}

const onSettings = () => {
  // Add your settings logic here
}
</script>

<style scoped>
.floating-island {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: row;
  gap: 10px;
  z-index: 1000;
}
</style>
