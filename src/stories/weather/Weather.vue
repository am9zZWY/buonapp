<template>
    <div>
        <button @click="editLocation" v-if="!edit.location" :disabled="disableEdit" class="hover:underline focus:outline-none">
            {{ weather.location }}
        </button>
        <input v-show="edit.location" v-model="locationInput" @blur="saveLocation" @keydown.enter="saveLocation" ref="locationInputEl" class="border-b border-gray-300 italic" />
        – {{ weather.temperature }}°C – {{ weather.weather }}
    </div>
    <div class="text-gray-600 font-extralight text-xs">
        Last updated: {{ weather.lastUpdated }}
    </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {useWeatherStore} from "@/stores";

type WeatherProps = {
    disableEdit?: boolean,
}

type Edit = { [key: string]: boolean }
const edit = ref<Edit>({})

withDefaults(defineProps<WeatherProps>(), {
    disableEdit: false
})

const weatherStore = useWeatherStore()

const weather = computed(() => weatherStore.weather)
const locationInput = ref<string>('')
const locationInputEl = ref(null)


const editLocation = () => {
    edit.value.location = true
    locationInputEl.value?.focus()
    console.log('editLocation', locationInputEl.value)
}
const saveLocation = () => {
    edit.value.location = false
    weatherStore.updateLocation(locationInput.value)
}

watch(() => weather.value.location, () => {
    locationInput.value = weather.value.location
}, {immediate: true})
</script>
