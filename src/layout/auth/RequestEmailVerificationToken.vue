<template>
  <div id="forgot-password-layout">
    <div class="tw-mt-16">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        Request Email Verification?
      </h3>
      <p class="tw-text-sm tw-mb-8 tw-text-gray">
        Missed verification? we'll send you a new reset instructions to your
        registered mail
      </p>

      <form @submit.prevent="requestToken">
        <TextInput
          name="email"
          id="email"
          label="Email"
          placeHolder="example@email.com"
          type="email"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @set="setEmail"
          @valid="updateValidResult"
        />

        <Btn
          class="tw-mt-8"
          title="Reset Password"
          :btnStyle="baseStore.blueBtn"
          :disabled="baseStore.btnLoading"
          :loading="baseStore.btnLoading"
        />

        <div class="tw-flex tw-justify-end tw-mt-2">
          <router-link
            :to="{ name: 'Login' }"
            class="tw-font-medium hover:tw-text-blue tw-transition-all tw-duration-300 tw-cursor-pointer"
          >
            Go back to login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useBaseStore } from "@/stores/baseStore.js";
import { useAuthStore } from "@/stores/authStore.js";

import TextInput from "@/components/general/TextInput.vue";
import Btn from "@/components/general/Btn.vue";
import router from "@/router";

const authStore = useAuthStore();
const baseStore = useBaseStore();

const validResults = ref([{ email: false }]);
const formValid = ref(false);
const payload = ref({});

const requestToken = () => {
  setTimeout(async () => {
    if (!formValid.value) return;

    authStore.requestEmailToken(payload.value?.email);
  }, 500);
};

const setEmail = (text) => {
  payload.value.email = text;
};

const setFormValid = () => {
  formValid.value = validResults.value.some((result) => {
    if (result.email === true) return true;
  });
};

const updateValidResult = (payload) => {
  switch (payload.type) {
    case "email":
      validResults.value.find((obj) => (obj.email = payload.value));
      break;

    default:
      break;
  }
  setFormValid();
};
</script>

<style lang="scss" scoped></style>
