<template>
    <ba-thumbnails-container title="Buon giorno ☀️">
        <ba-thumbnail alt="Weather Image" description="Milan, Italy"
                      eyebrow="Meteo"
                      src="https://t3.ftcdn.net/jpg/01/31/58/14/240_F_131581464_7DapB1Od4L3Vjr8aBfk7wkM9grBmDGYA.jpg"
                      title="Weather" to="giorno">
            <template #description>
                <weather location="Milan, Italy"/>
            </template>
        </ba-thumbnail>
    </ba-thumbnails-container>

    <ba-thumbnails-container title="️Cosa cucinare oggi? 🍝">
        <ba-thumbnail alt="Cooking Image" description="Scopri nuove ricette e prepara piatti deliziosi!"
                      eyebrow="Ricette"
                      src="https://t4.ftcdn.net/jpg/03/32/75/39/240_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg"
                      title="Cooking"
                      to="/appetito">
            <template #description>
                <p>Find new recipes and prepare delicious dishes!</p>
            </template>
        </ba-thumbnail>
    </ba-thumbnails-container>
</template>

<script setup lang="ts">
import BaThumbnail from "@/stories/thumbnail-link/ThumbnailLink.vue";
import BaThumbnailsContainer from "@/stories/thumbnail-link/ThumbnailLinkContainer.vue";
import Weather from "@/stories/weather/Weather.vue";
</script>
