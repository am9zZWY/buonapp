<template>
  <div>
    <Section title="Sei nuovo qui? 🌞" subtitle="Getting Started">
      <template #before>
        <QuickLook>
          <QuickLookWrapper title="User ID">
            {{ userId }}
          </QuickLookWrapper>

          <VSep height="10" />

          <QuickLookWrapper title="Device ID">
            {{ deviceId }}
          </QuickLookWrapper>
        </QuickLook>
      </template>

      <Subsection title="Welcome to Buonapp!">
        <p>
          Buonapp is a beautifully designed todo app that makes planning your day a delight. Created
          with love and care, it's simple to use.<br >
          Get started by creating a new session, logging into an existing one, or dive right in
          without an account.
        </p>
      </Subsection>

      <div class="flex flex-row gap-4 items-center justify-center mt-4">
        <div
          class="bg-primary-500 dark:bg-primary-700 shadow-primary-800 p-3 rounded-xl shadow-lg dark:shadow-lg inline-block"
        >
          <input
            v-model.trim="newUserId"
            class="w-full dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent p-0 m-0 text-gray-900 placeholder-gray-900"
            placeholder="Enter your User ID"
            type="text"
          >
        </div>

        <div class="p-3">and</div>

        <button
          class="btn border border-primary-500 dark:border-primary-700 text-white px-4 py-2 rounded-xl hover:border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap inline-block"
          @click="createSession"
        >
          Create a New Session
        </button>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

const newUserId = ref('')
const router = useRouter()

const sessionStore = useSessionStore()
const createSession = () => {
  sessionStore
    .createSession(newUserId.value === '' ? undefined : newUserId.value)
    .then((status) => {
      if (status) {
        //router.push('/')
      }
    })
}
const { userId, deviceId } = storeToRefs(sessionStore)
</script>
