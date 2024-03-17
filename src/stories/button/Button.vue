<template>
  <button class="text-white font-bold py-2 px-4 rounded-full mx-1" type="button" :class="classes" @click="onClick" :style="style" :label="label">{{ label }}</button>
</template>

<script lang="ts" setup>
import './button.css'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The label of the button
     */
    label: string
    /**
     * primary or secondary button
     */
    primary?: boolean
    /**
     * size of the button
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * background color of the button
     */
    backgroundColor?: string
  }>(),
  { primary: false }
)

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()

const classes = computed(() => ({
  'ba-button--primary': props.primary,
  'ba-button--secondary': !props.primary,
  [`ba-button--${props.size || 'medium'}`]: true
}))

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}))

const onClick = () => {
  emit('click', 1)
}
</script>
