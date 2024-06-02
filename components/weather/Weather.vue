<template>
    <span v-if="compact">
      <UPopover v-model:open="isEditMode">
        <template #default="{ open }">
            <button
              :class="[{ 'hover:underline': !disableLastUpdated}]" :disabled="disableEdit"
              class="focus:outline-none inline-block text-nowrap text-left" @click="open">
              {{ weather.temperature }}°C, {{ weather.weather.toLowerCase() }}<br>in {{ weather.location }}
            </button>
        </template>

        <template #panel>
          <div class="p-2 space-y-2 flex flex-col">
            <input
              ref="locationInputEl" v-model="locationInput"
              class="w-full text-gray-900 dark:text-gray-100 resize-none border-none focus:outline-none bg-transparent italic p-0 m-0"
              @blur="saveLocation" @keydown.enter="saveLocation">
          </div>
        </template>
      </UPopover>
    </span>
  <div v-else>
    The weather in
    <button
      v-if="!isEditMode" :class="[{ 'hover:underline': !disableLastUpdated}, 'focus:outline-none']"
      :disabled="disableEdit"
      @click="editLocation">
      {{ weather.location }}
    </button>
    <input
      v-show="isEditMode" ref="locationInputEl" v-model="locationInput"
      class="border-b border-gray-300 italic rounded"
      @blur="saveLocation" @keydown.enter="saveLocation">
    is {{ weather.temperature }}°C and {{ weather.weather.toLowerCase() }}.
    <p v-if="!disableLastUpdated" class="text-gray-600 font-extralight text-xs">
      Last updated: {{ weather.lastUpdated }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useWeatherStore } from '~/stores/weather'

type WeatherProps = {
  disableEdit?: boolean,
  disableLastUpdated?: boolean,
  compact?: boolean,
}

const props = withDefaults(defineProps<WeatherProps>(), {
  disableEdit: false,
  disableLastUpdated: false,
  compact: false
})
const isEditMode = defineModel<boolean>('edit')

const { disableEdit, disableLastUpdated, compact } = toRefs(props)

const weatherStore = useWeatherStore()

const { weather } = storeToRefs(weatherStore)
const locationInput = useState('locationInput', () => weather.value.location)
const locationInputEl = useState('locationInputEl', () => null)


const editLocation = () => {
  if (disableEdit.value) {
    return
  }
  isEditMode.value = true
}
const saveLocation = () => {
  isEditMode.value = false
  weatherStore.updateLocation(locationInput.value)
}

watch(() => weather.value.location, () => {
  locationInput.value = weather.value.location
}, { immediate: true })
</script>
