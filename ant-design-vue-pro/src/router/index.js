import Vue from "vue";
import VueRouter from "vue-router";
import { findLast } from 'lodash';
import { notification } from 'ant-design-vue';
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";
import { check, isLogin } from "../utils/auth";

Vue.use(VueRouter);

const routes = [
  { // 有关登录注册的路由
    path: "/user",
    hideInMenu: true, // 标志位表示不需要展示这个路由到菜单
    component: () =>
     import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"), // 提供登录注册的基础页面(router-view主要是)但是默认会走登录
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
          path: "/user/login",
          name: "login",
          component: () => 
            import(/* webpackChunkName: "user" */ "../views/User/login")
      },
      {
        path: "/user/register",
        name: "egister",
        component: () =>
         import(/* webpackChunkName: "user" */ "../views/User/register")
      }
    ]
  },
  { // 直接输入8080走的正常首页（定位到分析那里）
    path: "/",
    meta: { authority: ['user', 'admin'] }, // 添加权限标识，即允许访问权限组
    component: () => 
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashborad",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘", authority: ['admin'] }, // 存放路由代表的文字信息和图标
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () => 
              import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis")
          }
        ]
      },
      { // 表格页（定位到第一个表格）
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForms")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForms"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => 
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForms/Step1")
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => 
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForms/Step2")                
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => 
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForms/Step3")
              }
            ]            
          }
        ]
      }
    ]
  },
  { // 无权限走这里
    path: "/403",
    hideInMenu: true, // 标志位表示不需要展示这个路由到菜单
    name: "403",
    component: Forbidden
  },
  { // 都配不上是走这个404
    path: "*",
    hideInMenu: true, // 标志位表示不需要展示这个路由到菜单
    name: "404",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => { // 路由守卫开启动画和权限检测
  if (to.path !== from.path) {
    Nprogress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority); // 获取当前路径最近的一个路由的信息
  if (record && !check(record.meta.authority)) { // 路由信息存在且无权限
    if (!isLogin && to.path !=="/user/login") { // 未登录且不是在登录页
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") { // 已经登录但是无权限
      notification.error({
        message: '403',
        description: "请联系管理员获取权限"
      });
      next({
        path: "/403"
      });
    }
    Nprogress.done(); // 需要在这里关闭路由跳转的动画因为没有执行到next无法走关闭动画路线
  }
  next();
});

router.afterEach(() => { // 关闭加载动画
  Nprogress.done();
});

export default router;
