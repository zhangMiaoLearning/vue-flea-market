import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
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
  ]
})
router.beforeEach((to,from,next)=>{
  const store = useLoadingStore()
  store.$state.isLoading = true
  console.log(123);
  next()
})
router.afterEach((to)=>{
  const store = useLoadingStore()
  store.$state.isLoading = false
  console.log(234);
})

export default router
