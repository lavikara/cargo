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
          path: "signup/individual",
          name: "IndividualSignup",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/IndividualSignup.vue"
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
          path: "forgot-password/success",
          name: "ForgotPasswordSuccess",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/ForgotPasswordSuccess.vue"
            ),
        },
        {
          path: "reset-password",
          name: "ResetPassword",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/ResetPassword.vue"
            ),
        },
        {
          path: "verify-email/:token/:email",
          name: "VerifyEmail",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/VerifyEmail.vue"
            ),
          props: true,
        },
        {
          path: "verify-email/resend",
          name: "RequestEmailVerificationToken",
          component: () =>
            import(
              /* webpackChunkName: "auth" */
              "@/layout/auth/RequestEmailVerificationToken.vue"
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
