<template>
    <button type="button" class="Button" :class="{ 'round': props.rounded, 'font-serif': props.serif }"
            @click="onClick" :label="label">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script lang="ts" setup>
import './button.css'

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
