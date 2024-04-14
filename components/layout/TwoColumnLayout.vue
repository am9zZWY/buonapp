<!--
  - Copyright (c) 2023-2024 Josef Müller.
  -->

<template>
  <div class="flex">
    <div v-if="$slots.left" class="left">
      <slot name="left" />
    </div>

    <div v-if="$slots.right" class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType, toRefs, useSlots } from 'vue'

const props = defineProps({
  layout: {
    type: String as PropType<'default' | 'leftBigger' | 'rightBigger' | 'noRight'>,
    required: false,
    default: 'default'
  }
})
const { layout } = toRefs(props)

const slots = useSlots()
const hasRightSlot = computed(() => !!slots['right'])

type Layout = {
  left: {
    xl: string, lg: string, md: string, sm: string
  }, right: {
    xl: string, lg: string, md: string, sm: string
  }
}

const layouts: { [key: string]: Layout } = {
  default: {
    left: {
      xl: '6', lg: '6', md: '6', sm: '6'
    }, right: {
      xl: '6', lg: '6', md: '6', sm: '6'
    }
  }, leftBigger: {
    left: {
      xl: '8', lg: '8', md: '7', sm: '6'
    }, right: {
      xl: '4', lg: '4', md: '5', sm: '6'
    }
  }, rightBigger: {
    left: {
      xl: '4', lg: '4', md: '5', sm: '6'
    }, right: {
      xl: '8', lg: '8', md: '7', sm: '6'
    }
  }, noRight: {
    left: {
      xl: '12', lg: '12', md: '12', sm: '12'
    }, right: {
      xl: '0', lg: '0', md: '0', sm: '0'
    }
  }
}

const selectedLayout = computed(() => hasRightSlot.value ? layouts[layout.value] : layouts['noRight'])
</script>

<style>
.left {
  margin: 0;
  padding-left: 0;
  padding-right: 1rem;
}

.right {
  margin: 0;
  padding-left: 1rem;
  padding-right: 0;
}

@media (max-width: 768px) {
  .left {
    padding-left: 0;
    padding-right: 0;
  }

  .right {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
