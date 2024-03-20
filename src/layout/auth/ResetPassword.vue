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
        In order to protect your account, make sure your password has:
      </p>
      <div class="tw-grid tw-grid-cols-2 tw-gap-3">
        <div class="tw-flex tw-items-center tw-gap-1 tw-pt-4">
          <CheckBlueIcon v-if="validResults[0].hasEightOrMoreCharacters" />
          <CloseRedIcon
            v-if="!validResults[0].hasEightOrMoreCharacters"
            fillColor="red"
          />
          <p class="tw-text-gray tw-text-xs">At least 8 characters</p>
        </div>
        <div class="tw-flex tw-items-center tw-gap-1 tw-pt-4">
          <CheckBlueIcon v-if="validResults[0].hasNumber" />
          <CloseRedIcon v-if="!validResults[0].hasNumber" fillColor="red" />
          <p class="tw-text-gray tw-text-xs">At least one number</p>
        </div>

        <div class="tw-flex tw-items-center tw-gap-1">
          <CheckBlueIcon v-if="validResults[0].hasUpperCase" />
          <CloseRedIcon v-if="!validResults[0].hasUpperCase" fillColor="red" />
          <p class="tw-text-gray tw-text-xs">At least one uppercase letter</p>
        </div>

        <div class="tw-flex tw-items-center tw-gap-1">
          <CheckBlueIcon v-if="validResults[0].hasSpecialCharacters" />
          <CloseRedIcon
            v-if="!validResults[0].hasSpecialCharacters"
            fillColor="red"
          />
          <p class="tw-text-gray tw-text-xs">At least one special character</p>
        </div>

        <div class="tw-flex tw-items-center tw-gap-1">
          <CheckBlueIcon v-if="validResults[0].hasLowerCase" />
          <CloseRedIcon v-if="!validResults[0].hasLowerCase" fillColor="red" />
          <p class="tw-text-gray tw-text-xs">At least one lowercase letter</p>
        </div>
      </div>
      <form @submit.prevent="resetPassword">
        <PasswordInput
          class="tw-mt-4"
          name="password"
          id="password"
          label="Password"
          placeHolder="Password"
          :type="passwordInputType"
          :validatePassword="true"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @showPassword="showPassword"
          @set="setPassword"
          @valid="updateValidResult"
        />
        <PasswordInput
          class="tw-mt-4"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          placeHolder="Confirm Password"
          :type="passwordInputType"
          :showLabel="true"
          :disabled="
            baseStore.btnLoading || payload.newPassword?.length === undefined
          "
          :passwordToConfirm="payload.newPassword"
          @showPassword="showPassword"
          @set="setConfirmPassword"
          @valid="updatePasswordMatchValidResult"
        />

        <Btn
          class="tw-mt-8"
          title="Reset Password"
          :btnStyle="baseStore.blueBtn"
          :disabled="baseStore.btnLoading"
          :loading="baseStore.btnLoading"
        />
      </form>
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useBaseStore } from "@/stores/baseStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import CheckBlueIcon from "@/components/icons/CheckBlueIcon.vue";
import CloseRedIcon from "@/components/icons/CloseRedIcon.vue";
import PasswordInput from "@/components/general/PasswordInput.vue";
import Btn from "@/components/general/Btn.vue";

const baseStore = useBaseStore();
const authStore = useAuthStore();
const route = useRoute();

const validResults = ref([
  {
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialCharacters: false,
    hasEightOrMoreCharacters: false,
    passwordMatch: false,
  },
]);
const formValid = ref(false);
const payload = ref({});
const passwordInputType = ref("password");

const setPassword = (text) => {
  payload.value.newPassword = text;
};

const setConfirmPassword = (text) => {
  payload.value.confirmPassword = text;
};

const resetPassword = () => {
  payload.value.email = route.params.email;
  payload.value.token = route.params.token;
  setTimeout(async () => {
    if (!formValid.value) return;
    authStore.resetPassword(payload.value);
  }, 1000);
};

const setFormValid = () => {
  formValid.value = validResults.value.some((result) => {
    if (
      result.hasLowerCase === true &&
      result.hasUpperCase === true &&
      result.hasNumber === true &&
      result.hasSpecialCharacters === true &&
      result.hasEightOrMoreCharacters === true &&
      result.passwordMatch === true
    )
      return true;
  });
};

const updatePasswordMatchValidResult = (payload) => {
  switch (payload.type) {
    case "passwordMatch":
      validResults.value.find((obj) => (obj.passwordMatch = payload.value));
      break;

    default:
      break;
  }
  setFormValid();
};

const updateValidResult = (payload) => {
  switch (payload.type) {
    case "hasEightOrMoreCharacters":
      validResults.value.find(
        (obj) => (obj.hasEightOrMoreCharacters = payload.value)
      );
      break;
    case "hasLowerCase":
      validResults.value.find((obj) => (obj.hasLowerCase = payload.value));
      break;
    case "hasUpperCase":
      validResults.value.find((obj) => (obj.hasUpperCase = payload.value));
      break;
    case "hasNumber":
      validResults.value.find((obj) => (obj.hasNumber = payload.value));
      break;
    case "hasSpecialCharacters":
      validResults.value.find(
        (obj) => (obj.hasSpecialCharacters = payload.value)
      );
      break;
    case "passwordMatch":
      validResults.value.find((obj) => (obj.passwordMatch = payload.value));
      break;
    case "passwordReset":
      validResults.value[0].hasLowerCase = false;
      validResults.value[0].hasUpperCase = false;
      validResults.value[0].hasNumber = false;
      validResults.value[0].hasSpecialCharacters = false;
      validResults.value[0].hasEightOrMoreCharacters = false;
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
