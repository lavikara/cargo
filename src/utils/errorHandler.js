import { useAuthStore } from "@/stores/authStore";
import { useBaseStore } from "@/stores/baseStore";

export default {
  handleError(error) {
    const authStore = useAuthStore();
    const baseStore = useBaseStore();

    let message = null;
    if (error.message === "Network Error") {
      message = "Connection not established";
    } else if (error.message === "Request failed with status code 401") {
      authStore?.logout();
      message = "You're not Authorized";
    } else if (error.message == "timeout exceeded") {
      message = error.message;
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message
    ) {
      message = error.response.data.error.message;
    } else if (error.response.data && error.response.data.message) {
      message = error.response.data && error.response.data.message;
    } else {
      message = "An error occured";
    }

    baseStore.showToast({
      description: message,
      display: true,
      type: "error",
    });
  },
};
