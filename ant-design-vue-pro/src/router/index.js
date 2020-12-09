import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  { // 有关登录注册的路由
    path: "/user",
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
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () => 
              import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis")
          }
        ]
      },
      { // 表格页（定位到第一个表格）
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForms")
          },
          {
            path: "/form/step-form",
            name: "stepform",
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
  { // 都配不上是走这个404
    path: "*",
    name: "404",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => { // 路由守卫开启动画
  if (to.path !== from.path) {
    Nprogress.start();
  }
  next();
});

router.afterEach(() => { // 关闭加载动画
  Nprogress.done();
});

export default router;
