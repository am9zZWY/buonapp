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
        class="floating-island p-2 rounded-3xl shadow-lg ring-1 ring-black/5 bg-white/70 dark:bg-neutral-600 items-center">
        <button class="rounded-3xl p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700" @click="toHome">
          <UIcon name="ri:home-4-line" :dynamic="true" />
        </button>
        <!-- <div class="mx-2 h-8 bg-gray-300 dark:bg-white w-px" />
        <button class="rounded-2xl p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700" @click="toSettings">
          <UIcon name="ri:settings-5-line" dynamic />
        </button> -->
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const onLogin = () => userStore.login('Josef')
const onLogout = () => userStore.logout()
const onCreateAccount = () => userStore.createAccount('Josef', '123@123.de')

const toSettings = () => {
  router.push('/settings')
}
const toHome = () => {
  router.push('/')
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
