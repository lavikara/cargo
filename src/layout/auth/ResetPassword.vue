<template>
  <div id="forgot-password-success-layout">
    <div class="tw-mt-10">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-2"
      >
        Reset your password
      </h3>
      <p class="tw-text-sm tw-mb-5 tw-text-black">
        Time for a fresh start, go ahead and set a new password
      </p>

      <p class="tw-text-sm tw-mb-1 tw-text-gray">
        In order to protect your account, make sure your password:
      </p>

      <ul class="tw-list-disc">
        <li>
          <p class="tw-text-sm tw-mb-1 tw-text-gray">
            Is longer than 8 characters
          </p>
        </li>
        <li>
          <p class="tw-text-sm tw-mb-1 tw-text-gray">
            Does not match or significantly contain your username e.g do not
            user 'username123'
          </p>
        </li>
      </ul>

      <TextInput
        class="tw-mt-4"
        name="password"
        id="password"
        label="Password"
        placeHolder="Password"
        :validatePassword="true"
        :type="passwordInputType"
        :showLabel="true"
        :disabled="baseStore.btnLoading"
        @showPassword="showPassword"
        @set="setPassword"
        @valid="updateValidResult"
      />

      <TextInput
        class="tw-mt-4"
        name="confirmPassword"
        id="confirmPassword"
        label="Confirm Password"
        placeHolder="Confirm Password"
        :validatePassword="true"
        :type="passwordInputType"
        :showLabel="true"
        :disabled="baseStore.btnLoading"
        @showPassword="showPassword"
        @set="setPassword"
        @valid="updateValidResult"
      />

      <Btn
        class="tw-mt-8"
        title="Reset Password"
        :btnStyle="baseStore.blueBtn"
        :disabled="baseStore.btnLoading"
        :loading="baseStore.btnLoading"
        @click="resetPassword"
      />

      <div class="tw-flex tw-justify-end tw-mt-3">
        <router-link
          :to="{ name: 'Login' }"
          class="tw-font-medium hover:tw-text-blue tw-transition-all tw-duration-300 tw-cursor-pointer"
        >
          Go back to login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBaseStore } from "@/stores/baseStore.js";
import { ref } from "vue";

import TextInput from "@/components/general/TextInput.vue";
import Btn from "@/components/general/Btn.vue";
import router from "@/router";

const baseStore = useBaseStore();

const validResults = ref([{ password: false, confirmPassword: false }]);
const formValid = ref(false);
const payload = ref({ password: "", confirmPassword: "" });
const passwordInputType = ref("password");

const setPassword = (text) => {
  payload.value.password = text;
};

const setConfirmPassword = (text) => {
  payload.value.confirmPassword = text;
};

const resetPassword = () => {
  router.replace({ name: "ResetPassword" });
};

const setFormValid = () => {
  formValid.value = validResults.value.some((result) => {
    if (result.password === true && result.confirmPassword === true)
      return true;
  });
};

const updateValidResult = (payload) => {
  switch (payload.type) {
    case "password":
      validResults.value.find((obj) => (obj.password = payload.value));
      break;
    case "confirmPassword":
      validResults.value.find((obj) => (obj.confirmPassword = payload.value));
      break;

    default:
      break;
  }
  setFormValid();
};

const showPassword = (payload) => {
  switch (payload.type) {
    case "password":
      passwordInputType.value = "text";
      break;

    case "text":
      passwordInputType.value = "password";
      break;

    default:
      break;
  }
};
</script>

<style lang="scss" scoped></style>
