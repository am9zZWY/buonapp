<template>
  <div
    :class="`${highlight ? 'bg-primary-400 dark:bg-primary-700 shadow-primary-800 font-serif font-bold' : 'bg-white-50 dark:bg-white-700'} p-3
    rounded-xl shadow-md dark:shadow-lg cursor-pointer text-nowrap h-full flex flex-col
    items-center justify-center hover:shadow-inner hover:-translate-y-0.5 transition-all duration-500 ease-in-out`"
    @click="to && goTo(to)"
  >
    <div
class="flex flex-col items-center justify-center max-w-48 overflow-x-auto text-center">
      <div
        :class="`${highlight ? 'dark:text-white' : 'text-gray-600 dark:text-gray-400'} ${to ? 'hover:underline' : ''}`"
      >
        <slot />
      </div>
    </div>
    <div v-if="title" class="self-start mt-2 font-extralight text-gray-300 dark:text-gray-500">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface QuickLookProps {
  title?: string
  highlight?: boolean
  to?: string
}

withDefaults(defineProps<QuickLookProps>(), {
  title: '',
  highlight: false,
  to: ''
})

const router = useRouter()
const goTo = (to: string) => router.push(to)
</script>
