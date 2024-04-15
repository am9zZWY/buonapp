<template>
    <ThumbnailLinkContainer title="Buon giorno ☀️">
        <ThumbnailLink alt="Weather Image" description="Milan, Italy"
                      eyebrow="Meteo"
                      src="https://t3.ftcdn.net/jpg/01/31/58/14/240_F_131581464_7DapB1Od4L3Vjr8aBfk7wkM9grBmDGYA.jpg"
                      title="Weather" to="/buon/giorno">
            <template #description>
                <Weather disable-edit disable-last-updated />
            </template>
        </ThumbnailLink>
    </ThumbnailLinkContainer>

    <ThumbnailLinkContainer title="️Cosa cucinare oggi? 🍝">
        <ThumbnailLink alt="Cooking Image" description="Scopri nuove ricette e prepara piatti deliziosi!"
                      eyebrow="Appetito"
                      src="https://t4.ftcdn.net/jpg/03/32/75/39/240_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg"
                      title="Recipe of the day"
                      to="/buon/appetito/oftheday">
            <template #description>
                <p>Today's menu: pasta, pizza, and more!</p>
            </template>
        </ThumbnailLink>

        <ThumbnailLink alt="Cooking Image" description=""
                      src="https://t4.ftcdn.net/jpg/03/32/75/39/240_F_332753934_tBacXEgxnVplFBRyKbCif49jh0Wz89ns.jpg"
                      title="Search for new recipes"
                      to="/buon/appetito">
            <template #description>
                <p>Recipes and delicious dishes!</p>
            </template>
        </ThumbnailLink>
    </ThumbnailLinkContainer>
</template>

<script setup lang="ts">
import ThumbnailLinkContainer from '~/components/thumbnail/ThumbnailLinkContainer.vue'
</script>
