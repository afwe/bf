import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import mainpage from '@/page/mainpage'
import innerpage from '@/page/innerpage'
import commonnav from '@/components/common-nav'
import articleeditor from '@/page/admin/articleeditor'

Vue.use(Router)

export default new Router({
  base: '/afweshuaige/',
  mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: commonnav,
      // home页面并不需要被访问
      redirect: '/1',
      children: []
    },
    {
      path: '/',
      name: 'mainpage',
      component: mainpage
    },

    {
      path: '/article',
      name: 'innerpage',
      component: innerpage
    },
    {
      path: '/turnaturn',
      name: 'articleeditor',
      component: articleeditor
    },
  ]
})
