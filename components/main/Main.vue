<template>
    <ba-header :user="user" @login="onLogin" @logout="onLogout" @create-account="onCreateAccount"/>

    <div class="container mx-auto">
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>
import './main.css'
import BaHeader from '~/components/layout/header/Header.vue'

import {ref} from 'vue'

const user = ref<{ name: string } | null>(null)

const onLogin = () => {
    user.value = {name: 'Jane Doe'}
}
const onLogout = () => {
    user.value = null
}
const onCreateAccount = () => {
    user.value = {name: 'Jane Doe'}
}
</script>
