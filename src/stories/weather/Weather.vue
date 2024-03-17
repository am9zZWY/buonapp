<template>
    <div>
        {{ location }} - {{ temperature }}°C - {{ weather }}
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

type WeatherProps = {
    location: string
}

const props = withDefaults(defineProps<WeatherProps>(), {
    location: 'Milan, Italy'
})

const temperature = ref(15)
const weather = ref('Sunny')

/*
TODO:
onMounted(() => {
    fetch(`https://api.weatherapi.com/v
1/current.json?key=YOUR_API_KEY&q=${props.location}`)
        .then((response) => response.json())
        .then((data) => {
            temperature.value = data.current.temp_c
            weather.value = data.current.condition.text
        })
})
 */
</script>
