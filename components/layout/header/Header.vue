<template>
  <header class="max-w-screen-lg m-auto my-4 py-3">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <h1 class="text-2xl font-bold underline  decoration-wavy decoration-from-font underline-offset-8">
        <NuxtLink to="/">Buonapp</NuxtLink>
      </h1>

      <!-- Call to Action Buttons -->
      <div>
        <UPopover v-if="!user?.loggedIn">
          <template v-slot="{ open }">
            <Button @click="open" label="Ciao?" serif
                    trailing-icon="i-heroicons-arrow-right" />
          </template>

          <template #panel>
            <div class="p-2 space-y-2 flex flex-col">
              <Button
                serif
                @click="$emit('createAccount')"
                label="Sign up"
              />
              <Button
                serif
                class="bg-gray-100"
                @click="$emit('login')"
                label="Log in"
              />
            </div>
          </template>
        </UPopover>
        <span v-else class="font-serif">Ciao, <span class="font-bold">{{ user.name }}</span>!</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { User } from '~/types/user'

interface HeaderProps {
  user: User | null
}

withDefaults(defineProps<HeaderProps>(), {
  user: null
})

defineEmits<{
  (event: 'createAccount'): void
  (event: 'login'): void
  (event: 'logout'): void
}>()
</script>
