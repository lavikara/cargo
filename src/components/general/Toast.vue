<template>
  <transition name="show" mode="out-in">
    <div
      class="notification tw-fixed tw-border-l-4 tw-top-4 tw-right-2 tw-shadow-lg tw-pr-2 tw-z-50"
      :class="{
        'tw-border-green': baseStore.toast.type == 'success',
        'tw-border-red': baseStore.toast.type == 'error',
        'tw-border-blue': baseStore.toast.type == 'info',
      }"
      v-if="baseStore.toast.display"
    >
      <div
        class="tw-flex tw-flex-col tw-justify-start tw-items-start tw-bg-white tw-rounded tw-shadow-sm tw-text-black-light tw-px-4 tw-py-2"
      >
        <div class="tw-flex tw-items-center tw-w-full">
          <!-- <SuccessIcon v-show="baseStore.toast.type == 'success'" /> -->
          <!-- <ErrorIcon v-show="baseStore.toast.type == 'error'" /> -->
          <!-- <img
            v-show="baseStore.toast.type == 'info'"
            src="~@/assets/img/deleteicon.svg"
            alt="info icon"
          /> -->
          <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
            <h3 class="tw-text-xl tw-text-black tw-ml-3">
              {{ capitalize(baseStore.toast.type) }}
            </h3>
            <img
              class="tw-w-3 tw-cursor-pointer"
              src="https://res.cloudinary.com/djalafcj9/image/upload/v1635485821/getequityV2/close_muxdyb.webp"
              alt="close icon"
              @click="close"
            />
          </div>
        </div>
        <div class="tw-w-full">
          <p class="tw-text-base tw-text-black-light tw-ml-[2.2rem]">
            {{ baseStore.toast.description }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watchEffect, onMounted } from "vue";
import { useBaseStore } from "@/stores/baseStore.js";
import { capitalize } from "@/utils/helpers.js";
// import SuccessIcon from "@/components/icons/SuccessIcon.vue";
// import ErrorIcon from "@/components/icons/ErrorIcon.vue";

const baseStore = useBaseStore();

const close = () => {
  baseStore.showToast({
    description: "",
    display: false,
    type: "",
  });
};

const updateToast = (display) => {
  if (display === true) {
    setTimeout(() => {
      baseStore.showToast({
        description: "",
        display: false,
        type: "",
      });
    }, 5000);
  }
};

watchEffect(() => updateToast(baseStore.toast.display));
</script>

<style lang="scss" scoped>
.notification {
  max-width: 90%;
  min-width: 60%;
  z-index: 100000;

  @media screen and (min-width: 640px) {
    max-width: 30rem;
    min-width: 20rem;
  }
}
.show-enter-active,
.show-leave-active {
  transition: all 1s cubic-bezier(0.45, 0.25, 0.6, 0.95);
}

.show-enter-to,
.show-leave-from {
  right: 1rem;
}

.show-enter-from,
.show-leave-to {
  right: -20rem;
  transform: translate(530%, 20px);
}
</style>
