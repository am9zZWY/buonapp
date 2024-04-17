<template>
  <div>
    <div>
      The weather in
      <button @click="editLocation" v-if="!edit.location" :disabled="disableEdit"
              :class="[{ 'hover:underline': !disableLastUpdated}, 'focus:outline-none']">
        {{ weather.location }}
      </button>
      <input v-show="edit.location" v-model="locationInput" @blur="saveLocation" @keydown.enter="saveLocation"
             ref="locationInputEl" class="border-b border-gray-300 italic" />
      is {{ weather.temperature }}°C and {{ weather.weather.toLowerCase() }}.
    </div>
    <div class="text-gray-600 font-extralight text-xs" v-if="!disableLastUpdated">
      Last updated: {{ weather.lastUpdated }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useWeatherStore } from '~/stores/weather'

type WeatherProps = {
  disableEdit?: boolean,
  disableLastUpdated?: boolean
}

type Edit = { [key: string]: boolean }
const edit = ref<Edit>({})

withDefaults(defineProps<WeatherProps>(), {
  disableEdit: false,
  disableLastUpdated: false
})

const weatherStore = useWeatherStore()

const { weather } = storeToRefs(weatherStore)
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
}, { immediate: true })
</script>
