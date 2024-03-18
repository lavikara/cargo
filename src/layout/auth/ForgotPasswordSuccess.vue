<template>
  <div id="forgot-password-success-layout">
    <div class="tw-mt-16">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        Email sent!
      </h3>
      <p class="tw-text-sm tw-mb-8 tw-text-gray">
        We have sent an email to
        <span class="tw-text-black">{{ email }}</span>
      </p>

      <Btn
        class="tw-mt-8"
        title="Open Email App"
        :btnStyle="baseStore.blueBtn"
        :disabled="baseStore.btnLoading"
        :loading="baseStore.btnLoading"
        @click="openEmailApp"
      />

      <div class="tw-flex tw-justify-end tw-items-center tw-mt-8">
        <span class="tw-text-sm xxs:tw-mr-6">Didn’t get an email?</span>
        <router-link
          :to="{ name: 'ForgotPassword' }"
          class="tw-font-medium tw-border tw-border-gray-border tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue hover:tw-text-blue tw-transition-all tw-duration-300 tw-px-6 tw-py-2"
        >
          Resend Email
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";

import { useBaseStore } from "@/stores/baseStore.js";
import { getItem } from "@/utils/storage";

import TextInput from "@/components/general/TextInput.vue";
import Btn from "@/components/general/Btn.vue";

const email = ref("test@gmail.com");
let cachedMail = getItem("email");
email.value = cachedMail;

const baseStore = useBaseStore();

const openEmailApp = () => {
  router.replace({ name: "ResetPassword" });
};
</script>

<style lang="scss" scoped></style>
