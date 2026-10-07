import { createRouter, createWebHistory } from 'vue-router';
import RosterView from '@/views/RosterView.vue';
import EventView from '@/views/EventView.vue';
import StatsView from '@/views/StatsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/roster'
    },
    {
      path: '/roster',
      name: 'roster',
      component: RosterView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/events',
      name: 'events',
      component: EventView,
      meta: { requiresAuth: true }
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guestOnly: true } 
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { guestOnly: true }
    }
  ]
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    return { name: 'login' };
  }

  if (to.meta.guestOnly && token) {
    return { name: 'roster' };
  }
});

export default router;