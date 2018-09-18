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
          path: 'group-bar',
          component: () => import('@/components/GroupBar.vue'),
        },
        {
          path: 'bar',
          component: () => import('@/components/BarChart.vue'),
        },
      ],
    },
  ],
});
