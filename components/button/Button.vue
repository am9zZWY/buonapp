<template>
  <UButton
:class="{ 'round': props.rounded, 'font-serif': props.serif }" :label="label" class="shadow-inner"
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
