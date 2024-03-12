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
        console.log("data from login");
        console.log(response);
        console.log(data);

        this.user = data?.user;
        setItem("token", data?.token);

        baseStore.updateBtnLoadingState(false);

        router.replace({ name: "DashboardView" });
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
        console.log("data from register");
        console.log(response);
        console.log(data);

        this.user = data?.user;
        setItem("userId", data?.user?.userId);

        baseStore.updateBtnLoadingState(false);

        router.replace({ name: "Kyc" });
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
        console.log("data from register individual");
        console.log(response);
        console.log(data);

        baseStore.updateBtnLoadingState(false);
        router.replace({ name: "Login" });
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
        console.log("data from submit kyc");
        console.log(response);
        console.log(data);

        baseStore.updateBtnLoadingState(false);
        router.replace({ name: "AddMember" });
        return true;
      } catch (error) {
        baseStore.updateBtnLoadingState(false);
        errorHandler.handleError(error);
        return false;
      }
    },
  },
});
