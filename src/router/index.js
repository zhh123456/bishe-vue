import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginView from '@/components/LoginView'
import RegisterView from '@/components/register'
import MainIndex from '@/components/index'
import Main from '@/components/main'
import ShoppingCar from '@/components/shoppingCar'
import ShoppingMall from '@/components/shoppingMall'
import classify from '@/components/classify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainIndex',
      component: MainIndex
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/ShoppingCar',
      name: 'ShoppingCar',
      component: ShoppingCar
    },
    {
      path: '/ShoppingMall',
      name: 'ShoppingMall',
      component: ShoppingMall
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
  ]
})
