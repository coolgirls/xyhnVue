import Vue from 'vue'
import Router from 'vue-router'
import gift from '@/components/gift'
import person from '@/components/person'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gift',
      redirect: '/gift'
    },
    {
      path: '/gift',
      name: 'gift',
      component: gift,
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
    },
    {
      path: '/person',
      name: 'person',
      component: person
    }
  ]
})
