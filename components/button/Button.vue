<template>
  <UButton class="shadow-inner" :class="{ 'round': props.rounded, 'font-serif': props.serif }" :label="label" color="white" variant="solid" @click="onClick">
    <slot>
      {{ label }}
    </slot>
  </UButton>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label: string
    /**
     * rounded or square button
     */
    rounded?: boolean,
    /**
     * Serif or sans-serif font
     */
    serif?: boolean
  }>(),
  {
    rounded: false,
    serif: false
  }
)

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>
