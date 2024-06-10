<template>
  <div class="flex items-center gap-x-3 text-xs pb-5 pt-1 pl-2 -ml-2 overflow-x-scroll">
    <slot>
      <QuickLookWrapper :ignore-colors="true" highlight> Start your day!</QuickLookWrapper>

      <VSep height="10" />

      <QuickLookWrapper title="Weather" @click="editWeather = true">
        <Weather v-model:edit="editWeather" compact />
      </QuickLookWrapper>

      <VSep height="10" />

      <QuickLookWrapper title="News" to="/buone/notizie">
        Read the latest news
        <UIcon name="tabler:rss" class="ml-1" />
        <!-- <AiNews :max-news="2" subjects="politics, technology, climate" /> -->
      </QuickLookWrapper>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import QuickLookWrapper from '~/components/quicklook/QuickLookWrapper.vue'

const editWeather = useState('editMode', () => false)
</script>
