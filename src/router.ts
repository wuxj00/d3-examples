import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout.vue';
import Home from '@/views/Home.vue';

Vue.use(Router);

Vue.config.productionTip = false;

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'groupBar',
          component: () => import('@/components/GroupBar.vue'),
        },
        {
          path: '',
          component: () => import('@/components/Bar.vue'),
        },
        {
          path: 'bar',
          component: () => import('@/components/Bar.vue'),
        },
        {
          path: 'pie',
          component: () => import('@/components/Pie.vue'),
        },
        {
          path: 'line',
          component: () => import('@/components/Line.vue'),
        },
        {
          path: 'groupLine',
          component: () => import('@/components/GroupLine.vue'),
        },
        {
          path: 'lineHover',
          component: () => import('@/components/LineHover.vue'),
        },
        {
          path: 'area',
          component: () => import('@/components/Area.vue'),
        },
        {
          path: 'radar',
          component: () => import('@/components/Radar.vue'),
        },
      ],
    },
  ],
});
