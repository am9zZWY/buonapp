<template>
  <UButton class="shadow-inner" :class="{ 'round': props.rounded, 'font-serif': props.serif }" :label="label"
           color="white" variant="solid" @click="onClick">
    <slot>
      {{ label }}
    </slot>
  </UButton>
</template>

<script lang="ts" setup>
interface ButtonProps {
  label: string
  rounded?: boolean,
  serif?: boolean
}

const props = withDefaults(
  defineProps<ButtonProps>(),
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
