<template>
    <header class="max-w-screen-lg m-auto my-4 py-3 h-line">
        <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <router-link class="text-2xl font-bold" to="/">Buonapp</router-link>

            <!-- Call to Action Buttons -->
            <div>
                <ba-button v-if="!user" label="Log in" size="small" @click="$emit('login')"/>
                <span v-else class="welcome">Ciao, <b>{{ user.name }}</b>!</span>

                <!--
                TODO: Think about better ways to handle this. Login is boring!
                      Why should someone want to login?
                <ba-button size="small" @click="$emit('logout')" label="Log out" v-if="user"/>
                <ba-button
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
import BaButton from '../button/Button.vue'
import BaSearch from '../search/Search.vue'

interface HeaderProps {
    user: { name: string } | null
    title: string
}

const props = withDefaults(defineProps<HeaderProps>(), {
    user: null,
    title: 'Buonapp'
})

defineEmits<{
    (event: 'createAccount'): void
    (event: 'login'): void
    (event: 'logout'): void
}>()
</script>
