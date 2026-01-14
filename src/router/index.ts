import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppTop from '@/views/AppTop.vue'

const routeSettings: RouteRecordRaw[] = [
  {
    path: "/",
    name: "AppTop",
    component: AppTop
  },
  {
    path: "/member/memberList",
    name: "MemberList",
    //動的インポート。ルートパスとして表示する（必ず表示する）画面コンポーネント以外はこれがよい。
    component: () => {
      return import("@/views/member/MemberList.vue");
    }
  },
  {
    path: "/member/detail/:id",
    name: "MemberDetail",
    //動的インポート。ルートパスとして表示する（必ず表示する）画面コンポーネント以外はこれがよい。
    component: () => {
      return import('@/views/member/MemberDetail.vue');
    },
    props: true
  },
  {
    path: "/member/add",
    name: "MemberAdd",
    //動的インポート。ルートパスとして表示する（必ず表示する）画面コンポーネント以外はこれがよい。
    component: () => {
      return import ('@/views/member/MemberAdd.vue');
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings
});

export default router
