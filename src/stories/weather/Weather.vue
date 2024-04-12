<template>
    <div>
        <button @click="editLocation" v-if="!edit.location" :disabled="disableEdit">
            {{ location }}
        </button>
        <input v-show="edit.location" v-model="locationInput" @blur="saveLocation" ref="locationInputEl"/>
        – {{ temperature }}°C – {{ weather }}
    </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useWeatherStore} from "@/stores";

type WeatherProps = {
    disableEdit?: boolean
}

type Edit = { [key: string]: boolean }
const edit = ref<Edit>({})

withDefaults(defineProps<WeatherProps>(), {
    disableEdit: false
})

const weatherStore = useWeatherStore()

const location = computed(() => weatherStore.weather.location)
const temperature = computed(() => weatherStore.weather.temperature)
const weather = computed(() => weatherStore.weather.weather)
const locationInput = ref(weatherStore.weather.location)
const locationInputEl = ref(null)


const editLocation = () => {
    edit.value.location = true
    locationInputEl?.value?.focus()
}
const saveLocation = () => {
    edit.value.location = false
    weatherStore.updateLocation(locationInput.value)
}
</script>
