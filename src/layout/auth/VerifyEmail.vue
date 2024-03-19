<template>
  <div id="verify-email-layout">
    <div class="tw-pb-20 tw-mt-16" v-if="emailIsVerified">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        Email has been verified
      </h3>
      <p class="tw-text-sm">
        Enjoy our services from small parcels to large freight, our customized
        logistics solutions are designed to meet your specific requirements.
      </p>

      <h3 class="tw-text-sm tw-mt-8 tw-mb-8">Redirecting...</h3>
    </div>

    <div class="tw-pb-20 tw-mt-16" v-if="!emailIsVerified">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        Verifying your email...
      </h3>

      <LoadingIcon fillColor="#007AFF" strokeColor="#007AFF" />
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useBaseStore } from "@/stores/baseStore.js";

const authStore = useAuthStore();
const baseStore = useBaseStore();

import LoadingIcon from "@/components/icons/LoadingIcon.vue";

const emailIsVerified = ref(false);

const props = defineProps({
  token: String,
  email: String,
});

const verifyEmail = async () => {
  if (!props.token || !props.email) {
    baseStore.showToast({
      description: "Invalid or Expired token",
      display: true,
      type: "error",
    });

    redirectToLogin();
  }

  const response = await authStore.verifyEmail(props.token, props.email);
  emailIsVerified.value = response;
};
verifyEmail();

const redirectToLogin = () => {
  setTimeout(async () => {
    router.replace({ name: "Login" });
  }, 3000);
};
</script>

<style lang="scss" scoped></style>
