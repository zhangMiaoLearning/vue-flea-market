import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import PersonalInformation from '@/views/PersonalInformation.vue'
import ManageRolePage from '@/views/ManageRolePage.vue'
import { useLoadingStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/account',
      name: 'account',
      component: PersonalInformation
    },
    {
      path: '/manage',
      name: 'manage',
      component: ManageRolePage
    },
  ]
})
router.beforeEach((to, from, next) => {
  const store = useLoadingStore()
  store.$state.isLoading = true
  console.log(store.$state.isLoading)

  next()
})
router.afterEach((to) => {
  const store = useLoadingStore()
  setTimeout(() => {
    store.$state.isLoading = false
    console.log(store.$state.isLoading)
  }, 2000)

})

export default router
