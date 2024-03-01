import { defineStore } from "pinia";

export const useBaseStore = defineStore({
  id: "baseStore",
  state: () => {
    return {
      btnLoading: false,
      pageLoading: false,
      tableLoading: false,
      toast: {
        description: "",
        display: false,
        type: "",
      },
      blueBtn: {
        width: "100%",
        backgroundColor: "#007AFF",
        borderColor: "#007AFF",
        color: "#FFFFFF",
        hoverColor: "#007AFF",
        hoverBgColor: "#ffffff",
      },
    };
  },

  actions: {
    updateBtnLoadingState(payload) {
      this.btnLoading = payload;
    },

    updatePageLoadingState(payload) {
      this.pageLoading = payload;
    },

    updateTableLoadingState(payload) {
      this.tableLoading = payload;
    },

    showToast(payload) {
      this.toast = payload;
    },
  },
});
