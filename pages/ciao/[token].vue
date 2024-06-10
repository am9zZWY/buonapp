<template>
  <Section>
    <Subsection>
      <template #full-width>
        <p class="text-4xl font-serif text-center">
          Ciao ☀️
        </p>
      </template>
    </Subsection>
  </Section>
</template>

<script setup lang="ts">
const session = useSessionStore()
const route = useRoute()
const router = useRouter()
const { token } = route.params

if (session.isCreated) {
  router.push('/buon/giorno')
}

onMounted(() => {
  session.verifySession(token as string)
})
</script>
