import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const ComponentList = () => import('@/components/ComponentList')
const InputNumber = () => import('@/components/InputNumber')

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ComponentList,
    }
  ]
})