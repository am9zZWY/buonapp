<template>
    <div>
        <button @click="editLocation" v-if="!edit.location">
            {{ location }}
        </button>
        <input v-show="edit.location" v-model="location" @blur="saveLocation" ref="locationInput"/>
        – {{ temperature }}°C – {{ weather }}
    </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue'

type WeatherProps = {
    location: string
}

type Edit = { [key: string]: boolean }
const edit = ref<Edit>({})

const props = withDefaults(defineProps<WeatherProps>(), {
    location: 'Posada, Italy'
})

const location = ref(props.location)
const temperature = ref(15)
const weather = ref('Sunny')
const locationInput = ref(null)

const editLocation = () => {
    edit.value.location = true
    locationInput?.value?.focus()
}
const saveLocation = () => {
    edit.value.location = false
    fetchWeather(location.value)
}

const fetchWeather = async (location: string) => {
    if (!location || location === '') {
        return
    }

    fetch(`https://api.weatherapi.com/v
1/current.json?key=ed0259613b1d44d387890933241204&q=${location}`)
        .then((response) => response.json())
        .then((data) => {
            temperature.value = data.current.temp_c
            weather.value = data.current.condition.text
        })
}

watch(location, () => {
    if (edit.value.location) {
        return
    }
    fetchWeather(location.value)
}, {immediate: true})

</script>
