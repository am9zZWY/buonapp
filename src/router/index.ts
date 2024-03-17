import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'buon',
            redirect(to) {
                return {name: 'home'}
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/BuonHomeView.vue')
                },
                {
                    path: 'giorno',
                    name: 'giorno',
                    component: () => import('@/views/buon/GiornoView.vue')
                },
                {
                    path: 'viaggio',
                    name: 'viaggio',
                    component: () => import('@/views/buon/ViaggioView.vue')
                },
                {
                    path: 'appetito',
                    name: 'appetito',
                    component: () => import('@/views/buon/AppetitoView.vue')
                }
            ]
        }
    ]
})

export default router
