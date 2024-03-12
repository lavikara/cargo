<template>
  <div id="login-layout">
    <div class="tw-pb-20 tw-mt-28">
      <h3 class="tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-8">
        Sign In
      </h3>
      <form @submit.prevent="login">
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
        <TextInput
          class="tw-mt-4"
          name="password"
          id="password"
          label="Password"
          placeHolder="Password"
          :type="passwordInputType"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @showPassword="showPassword"
          @set="setPassword"
          @valid="updateValidResult"
        />
        <div class="tw-flex tw-justify-end tw-mt-2">
          <router-link
            :to="{ name: 'ForgotPassword' }"
            class="tw-font-medium hover:tw-text-blue tw-transition-all tw-duration-300 tw-cursor-pointer"
          >
            forgot password?
          </router-link>
        </div>
        <Btn
          class="tw-mt-8"
          title="Sign In"
          :btnStyle="baseStore.blueBtn"
          :disabled="baseStore.btnLoading"
          :loading="baseStore.btnLoading"
        />
        <div class="tw-flex tw-justify-center tw-items-center tw-mt-8">
          <span class="tw-text-sm xxs:tw-mr-6">Don’t have an account?</span>
          <router-link
            :to="{ name: 'Signup' }"
            class="tw-font-medium tw-border tw-border-gray-border tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue hover:tw-text-blue tw-transition-all tw-duration-300 tw-px-6 tw-py-2"
          >
            Sign Up
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
import { validateEmail, validatePassword } from "@/utils/helpers";

const authStore = useAuthStore();

const baseStore = useBaseStore();
const validResults = ref([{ email: false, password: false }]);
const formValid = ref(false);
const payload = ref({});
const passwordInputType = ref("password");

const login = () => {
  if (!validateEmail(payload.value.email)) {
    console.log("Email is required");
    return;
  }

  if (!validatePassword(payload.value.password)) {
    console.log("password is required");
    return;
  }

  authStore.login(payload.value);

  // setTimeout(async () => {
  //   if (!formValid.value) return;

  //   authStore.login(payload.value);
  // }, 500);
};

const setEmail = (text) => {
  payload.value.email = text;
};

const setPassword = (text) => {
  payload.value.password = text;
};

const setFormValid = () => {
  formValid.value = validResults.value.some((result) => {
    if (result.email === true && result.password === true) return true;
  });
};

const updateValidResult = (payload) => {
  switch (payload.type) {
    case "email":
      validResults.value.find((obj) => (obj.email = payload.value));
      break;
    case "password":
      validResults.value.find((obj) => (obj.password = payload.value));
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
