<template>
  <ba-header :user="user" @login="onLogin" @logout="onLogout" @create-account="onCreateAccount" />

  <div class="container mx-auto">
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import './main.css'
import BaHeader from '~/components/layout/header/Header.vue'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const onLogin = () => userStore.login('Josef')
const onLogout = () => userStore.logout()
const onCreateAccount = () => userStore.createAccount()
</script>
