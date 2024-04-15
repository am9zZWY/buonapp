<template>
  <header class="max-w-screen-lg m-auto my-4 py-3">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink class="text-2xl font-bold underline  decoration-wavy decoration-from-font underline-offset-8" to="/">Buonapp</NuxtLink>

      <!-- Call to Action Buttons -->
      <div>
        <Button v-if="!user?.loggedIn" label="Log in" size="small" serif @click="$emit('login')">
          Ciao?
        </Button>
        <span v-else class="welcome">Ciao, <b>{{ user.name }}</b>!</span>

        <!--
        TODO: Think about better ways to handle this. Login is boring!
              Why should someone want to login?
        <Button size="small" @click="$emit('logout')" label="Log out" v-if="user"/>
        <Button
            primary
            size="small"
            @click="$emit('createAccount')"
            label="Sign up"
            v-if="!user"
        /> -->
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import './header.css'
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
