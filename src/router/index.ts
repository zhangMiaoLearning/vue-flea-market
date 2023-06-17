import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import PersonalInformation from '@/views/PersonalInformation.vue'
import { useLoadingStore } from '@/stores'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/home',
      name:'home',
      component:Home
    },
    {
      path:'/account',
      name:'account',
      component:PersonalInformation
    },
  ]
})
router.beforeEach((to,from,next)=>{
  const store = useLoadingStore()
  store.$state.isLoading = true
  next()
})
router.afterEach((to)=>{
  const store = useLoadingStore()
  store.$state.isLoading = false
})

export default router
