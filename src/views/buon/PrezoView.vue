<template>
    <!-- List of people you want to split the bill with -->
    <ul>
        <li v-for="person in people" :key="person.id">
            <span>{{ person.name }}</span>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const people = ref([
    {id: 1, name: 'Me'},
    {id: 2, name: 'Isa'},
    {id: 3, name: 'Mama'},
    {id: 4, name: 'Papa'},
]);

const sconti = ref([
    {id: 0, title: 'Gelato', payerId: 1, price: 2, people: [2, 3, 4]},
    {id: 1, title: 'Pizza', payerId: 2, price: 10, people: [1, 3, 4]},
    {id: 2, title: 'Birra', payerId: 2, price: 5, people: [1, 3, 4]},
    {id: 3, title: 'Caffè', payerId: 4, price: 1, people: [1, 2, 3]},
])


</script>
