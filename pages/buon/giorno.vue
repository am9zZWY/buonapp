<template>
  <div>
    <Section title="Getting Started with Buonapp ☀️">
      <template #before>
        <div>
          <p>
            Access your account using
            <BuonappId />
            .
          </p>

          <QuickLook v-if="isVerified" title="Session Details" icon="🔍">
            <QuickLookWrapper title="Your Buonapp-ID">
              {{ buonappId }}
            </QuickLookWrapper>

            <DevOnly>
              <QuickLookWrapper title="Device ID">
                {{ deviceId }}
              </QuickLookWrapper>

              <QuickLookWrapper title="Token">
                {{ sessionStore.getToken() }}
              </QuickLookWrapper>

              <QuickLookWrapper title="Verified?">
                {{ sessionStore.isVerified }}
              </QuickLookWrapper>
            </DevOnly>
          </QuickLook>
        </div>
      </template>

      <Subsection title="Create an Account or Login">
        <div class="flex flex-col gap-4 md:flex-row md:gap-8 items-center justify-center">
          <div
            class="bg-primary-500 dark:bg-primary-700 shadow-primary-800 p-3
          rounded-xl shadow-lg dark:shadow-lg inline-block"
          >
            <span v-if="isVerified" class="inline-block bg-green-600 dark:bg-green-800 text-white px-2 py-0.5 my-0.5 rounded-md text-xs">
              {{ newUserId ? 'Logged in' : 'Account created' }} successfully!
            </span>
            <div>

              <label for="newUserId" class="text-gray-100 dark:text-gray-100 text-xs mb-1">
                {{ buonappId ? 'Your' : 'Optional' }} Buonapp-ID
              </label>
              <input
                v-model.trim="newUserId"
                class="w-full dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent p-0 m-0 text-gray-900 placeholder-gray-900"
                :class="{ 'font-serif italic': newUserId?.length !== 0}"
                placeholder="Enter your Buonapp-ID"
                type="text"
              >
            </div>
          </div>

          <button
            class="btn border border-primary-500 dark:border-primary-700 px-4 py-2 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-primary-500 text-nowrap inline-block hover:border-secondary-600
          hover:shadow-xl dark:hover:border-secondary-700 dark:hover:shadow-inner transition-all duration-300
          dark:text-gray-100 dark:bg-gray-900 hover:-translate-y-0.5"
            :class="{ 'cursor-pointer': !requestSent, 'bg-red-500 dark:bg-red-700 focus:ring-red-500 border-red-500': requestSent && !success }"
            @click="createSession"
          >
            <template v-if="!requestSent">
              {{ newUserId ? 'Login with' : 'Create' }}
              <BuonappId />
            </template>
            <template v-else>
              {{ success ? 'Success!' : 'Could not create account. Try again' }}
            </template>
          </button>
        </div>
      </Subsection>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import BuonappId from '~/components/BuonappId.vue'

const newUserId = ref('')
const router = useRouter()

// Success in creating an account or logging in
const requestSent = ref(false)
const success = ref(false)

const sessionStore = useSessionStore()
const { buonappId, deviceId, isVerified } = storeToRefs(sessionStore)
watch(isVerified, () => {
  newUserId.value = buonappId.value
  success.value = true
}, { immediate: true })

const createSession = () => {
  sessionStore
    .createSession(newUserId.value === '' ? undefined : newUserId.value)
    .then((status) => {
      requestSent.value = true
      success.value = status
    })
}
</script>
