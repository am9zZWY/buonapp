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
        class="floating-island p-2 rounded-xl shadow-lg ring-1 ring-black/5 bg-white/70 dark:bg-white-600 items-center">
        <button class="rounded-xl p-2 hover:bg-white-200 dark:hover:bg-white-700" @click="toHome">
          <UIcon name="ri:home-4-line" :dynamic="true" />
        </button>
        <VSep height="8" />
        <button class="rounded-xl p-2 hover:bg-white-200 dark:hover:bg-white-700" @click="toHome">
          <UIcon name="ri:settings-3-line" :dynamic="true" />
        </button>
        <VSep height="8" />
        <a
          class="rounded-xl p-1 hover:bg-white-200 dark:hover:bg-white-700"
          href="https://github.com/am9zZWY/buonapp" target="_blank" rel="noopener noreferrer" title="GitHub">
          <UIcon name="mdi:github" dynamic />
        </a>
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
