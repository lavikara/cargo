import { defineStore } from "pinia";
import { useBaseStore } from "./baseStore";
import errorHandler from "@/utils/errorHandler";
import authApi from "@/utils/api/authApi";
import { setItem } from "@/utils/storage";
import router from "@/router";

export const useAuthStore = defineStore({
  id: "authStore",

  state: () => {
    return {
      user: null,
    };
  },

  actions: {
    async login(payload) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);
      try {
        const response = await authApi.login(payload);
        const { data } = response;
        this.user = data?.user;

        baseStore.updateBtnLoadingState(false);
        router.push({ name: "DashboardView" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },

    async register(payload) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);
      try {
        const response = await authApi.register(payload);
        const { data } = response;
        this.user = data?.user;
        setItem("userId", data?.user?.userId);
        baseStore.updateBtnLoadingState(false);
        router.push({ name: "Kyc" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },

    async registerIndividual(payload) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);
      try {
        const response = await authApi.registerIndividual(payload);
        const { data } = response;
        baseStore.updateBtnLoadingState(false);
        router.push({ name: "Login" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },

    async submitKyc(payload, userId) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);

      try {
        const response = await authApi.submitKyc(payload, userId);
        const { data } = response;

        baseStore.updateBtnLoadingState(false);
        router.push({ name: "AddMember" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },

    async forgotPassword(payload) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);

      try {
        const response = await authApi.forgotPassword(payload);
        const { data } = response;
        setItem("email", data?.user?.email);
        console.log("data from forgotPassword");
        console.log(data);

        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "",
        });

        router.push({ name: "ForgotPasswordSuccess" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },

    async requestEmailToken(email) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);

      try {
        const response = await authApi.requestEmailToken(email);
        const { data } = response;
        setItem("email", data?.user?.email);
        console.log("data from request email token");
        console.log(data);

        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "",
        });

        router.push({ name: "ForgotPasswordSuccess" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },

    async verifyEmail(token, email) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);

      try {
        const response = await authApi.verifyEmail(token, email);
        const { data } = response;
        console.log("data from verify email");
        console.log(data);

        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "",
        });

        setTimeout(() => {
          router.replace({ name: "Login" });
        }, 3000);
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        setTimeout(() => {
          router.replace({ name: "Login" });
        }, 3000);
        return false;
      }
    },
  },
});
