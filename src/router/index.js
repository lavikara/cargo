import { createRouter, createWebHistory } from "vue-router";
const AuthView = () => import("@/views/AuthView.vue");
const DashboardView = () => import("@/views/DashboardView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AuthView",
      component: AuthView,
      children: [
        {
          path: "",
          name: "DefaultAuthView",
          redirect: { name: "Login" },
        },
        {
          path: "login",
          name: "Login",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/Login.vue"
            ),
        },
        {
          path: "signup",
          name: "Signup",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/Signup.vue"
            ),
        },
        {
          path: "signup-tier3",
          name: "EndUserSignup",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/EndUserSignup.vue"
            ),
        },
        {
          path: "kyc",
          name: "Kyc",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/Kyc.vue"
            ),
        },
        {
          path: "add-member",
          name: "AddMember",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/AddMember.vue"
            ),
        },
        {
          path: "forgot-password",
          name: "ForgotPassword",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/ForgotPassword.vue"
            ),
        },
        {
          path: "verify-email",
          name: "VerifyEmail",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/VerifyEmail.vue"
            ),
        },
      ],
    },

    {
      path: "/dashboard",
      name: "DashboardView",
      component: DashboardView,
      children: [],
    },
  ],
});

export default router;
