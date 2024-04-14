<!--
  - Copyright (c) 2023-2024 Josef Müller.
  -->

<template>
    <IonGrid>
        <IonRow>
            <IonCol v-if="$slots.left" :size-lg="selectedLayout.left.lg"
                    :size-md="selectedLayout.left.md"
                    :size-sm="$slots.right ? selectedLayout.left.sm : '12'"
                    :size-xl="selectedLayout.left.xl"
                    class="left"
                    size="12"
                    v-bind="$props">
                <slot name="left"/>
            </IonCol>

            <IonCol v-if="$slots.right" :size-lg="$slots.left ? selectedLayout.right.lg : '12'"
                    :size-md="$slots.left ? selectedLayout.right.md : '12'"
                    :size-xl="$slots.left ? selectedLayout.right.xl : '12'"
                    class="right"
                    size="12"
                    size-sm="12"
                    v-bind="$props">
                <slot name="right"/>
            </IonCol>
        </IonRow>
    </IonGrid>
</template>

<script lang="ts" setup>
import { computed, PropType, toRefs, useSlots } from 'vue';
import { IonCol, IonGrid, IonRow } from '@ionic/vue';

const props = defineProps({
    layout: {
        type: String as PropType<'default' | 'leftBigger' | 'rightBigger' | 'noRight'>,
        required: false,
        default: 'default'
    }
})
const {layout} = toRefs(props)

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