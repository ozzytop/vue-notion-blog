import { createRouter, createWebHashHistory } from 'vue-router'
import Blog from '../views/Blog.vue'

const routes = [
    {
        path: '/',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue')
    },
    {
        path: '/post/:post', 
        name: 'Post', 
        component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
