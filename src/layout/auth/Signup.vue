<template>
  <div id="signup-layout">
    <div class="tw-mt-16">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        CargoStation,Connecting Worlds, Faster and Smarter.
      </h3>
      <p class="tw-text-sm">
        From small parcels to large freight, our customized logistics solutions
        are designed to meet your specific requirements.
      </p>
      <h3 class="tw-font-semibold tw-text-xl tw-mt-8 tw-mb-8">Sign Up</h3>
      <form @submit.prevent="signup">
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
        <Btn
          class="tw-mt-8"
          title="Create Account"
          :btnStyle="baseStore.blueBtn"
          :disabled="baseStore.btnLoading"
          :loading="baseStore.btnLoading"
          @click="signup"
        />
        <div class="tw-flex tw-justify-center tw-items-center tw-mt-8">
          <span class="tw-text-sm xxs:tw-mr-6">Already have an account?</span>
          <router-link
            :to="{ name: 'Login' }"
            class="tw-font-medium tw-border tw-border-gray-border tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue hover:tw-text-blue tw-transition-all tw-duration-300 tw-px-6 tw-py-2"
          >
            Sign In
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBaseStore } from "@/stores/baseStore.js";
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();

import TextInput from "@/components/general/TextInput.vue";
import Btn from "@/components/general/Btn.vue";
import { validateEmail, validatePassword } from "@/utils/helpers";

const router = useRouter();
const baseStore = useBaseStore();
const validResults = ref([{ email: false, password: false }]);
const formValid = ref(false);
const payload = ref({});
const passwordInputType = ref("password");

const setEmail = (text) => {
  payload.value.email = text;
};

const setPassword = (text) => {
  payload.value.password = text;
};

const signup = () => {
  if (!validateEmail(payload.value.email)) {
    return;
  }

  if (!validatePassword(payload.value?.password)) {
    return;
  }

  authStore.register({ ...payload.value, tierType: 1 });
  // setTimeout(async () => {
  //   if (!formValid.value) return;
  // }, 500);
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
