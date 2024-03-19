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
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "success",
        });
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
        router.push({ name: "Kyc", params: { userId: data?.user?.userId } });
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
        setItem("inviteLink", data?.user?.teamInviteLink);
        this.user = data?.user;
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

        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "success",
        });

        router.push({ name: "Login" });
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
        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "success",
        });

        router.push({ name: "Login" });
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
        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "success",
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

    async resetPassword(payload) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);
      try {
        const response = await authApi.resetPassword(payload);
        const { data } = response;
        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "success",
        });
        router.push({ name: "Login" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },

    async addMembers(payload, userId) {
      const baseStore = useBaseStore();
      baseStore.updateBtnLoadingState(true);
      try {
        const response = await authApi.addMembers(payload, userId);
        const { data } = response;
        baseStore.updateBtnLoadingState(false);
        baseStore.showToast({
          description: data?.message,
          display: true,
          type: "success",
        });
        router.push({ name: "Login" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },
  },
});
