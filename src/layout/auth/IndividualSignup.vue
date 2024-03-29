<template>
  <div id="signup-enduser-layout">
    <div class="tw-my-16">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        CargoStation, Connecting Worlds, Faster and Smarter.
      </h3>
      <p class="tw-text-sm">
        From small parcels to large freight, our customized logistics solutions
        are designed to meet your specific requirements.
      </p>

      <h3 class="tw-font-semibold tw-text-xl tw-mt-8 tw-mb-8">Sign Up</h3>
      <form @submit.prevent="signup">
        <TextInput
          name="firstName"
          id="firstName"
          label="First Name"
          placeHolder="John"
          type="text"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @set="setFirstname"
          @valid="updateValidResult"
        />
        <TextInput
          class="tw-mt-4"
          name="lastName"
          id="lastName"
          label="Last Name"
          placeHolder="Doe"
          type="text"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @set="setLastname"
          @valid="updateValidResult"
        />
        <TextInput
          class="tw-mt-4"
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

        <!-- <TextInput
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
        /> -->

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
          @inputFocus="setFocus"
          @set="setPassword"
          @valid="updateValidResult"
        />
        <transition
          name="dropdown"
          @enter="enter"
          @after-enter="afterEnter"
          @leave="leave"
        >
          <div v-show="passwordFocus" class="tw-grid tw-grid-cols-2 tw-gap-3">
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
              <CloseRedIcon
                v-if="!validResults[0].hasUpperCase"
                fillColor="red"
              />
              <p class="tw-text-gray tw-text-xs">
                At least one uppercase letter
              </p>
            </div>

            <div class="tw-flex tw-items-center tw-gap-1">
              <CheckBlueIcon v-if="validResults[0].hasSpecialCharacters" />
              <CloseRedIcon
                v-if="!validResults[0].hasSpecialCharacters"
                fillColor="red"
              />
              <p class="tw-text-gray tw-text-xs">
                At least one special character
              </p>
            </div>

            <div class="tw-flex tw-items-center tw-gap-1">
              <CheckBlueIcon v-if="validResults[0].hasLowerCase" />
              <CloseRedIcon
                v-if="!validResults[0].hasLowerCase"
                fillColor="red"
              />
              <p class="tw-text-gray tw-text-xs">
                At least one lowercase letter
              </p>
            </div>
          </div>
        </transition>
        <Btn
          class="tw-mt-8"
          title="Create Account"
          :btnStyle="baseStore.blueBtn"
          :disabled="baseStore.btnLoading"
          :loading="baseStore.btnLoading"
        />
        <div class="tw-flex tw-justify-end tw-items-center tw-mt-8">
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
import TextInput from "@/components/general/TextInput.vue";
import PasswordInput from "@/components/general/PasswordInput.vue";
import CheckBlueIcon from "@/components/icons/CheckBlueIcon.vue";
import CloseRedIcon from "@/components/icons/CloseRedIcon.vue";
import Btn from "@/components/general/Btn.vue";

const router = useRouter();
const baseStore = useBaseStore();
const authStore = useAuthStore();

const validResults = ref([
  {
    email: false,
    firstName: false,
    lastName: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialCharacters: false,
    hasEightOrMoreCharacters: false,
  },
]);
const formValid = ref(false);
const passwordFocus = ref(false);
const payload = ref({});
const passwordInputType = ref("password");

const setFirstname = (text) => {
  payload.value.firstName = text;
};

const setLastname = (text) => {
  payload.value.lastName = text;
};

const setEmail = (text) => {
  payload.value.email = text;
};

const setPassword = (text) => {
  payload.value.password = text;
};

const setFocus = (payload) => {
  passwordFocus.value = payload.value;
};

const signup = () => {
  setTimeout(async () => {
    if (!formValid.value) return;

    authStore.registerIndividual({ ...payload.value, tierType: 3 });
  }, 500);
};

const setFormValid = () => {
  formValid.value = validResults.value.some((result) => {
    if (
      result.email === true &&
      result.firstName === true &&
      result.lastName === true &&
      result.hasLowerCase === true &&
      result.hasUpperCase === true &&
      result.hasNumber === true &&
      result.hasSpecialCharacters === true &&
      result.hasEightOrMoreCharacters === true
    )
      return true;
  });
};

const updateValidResult = (payload) => {
  switch (payload.type) {
    case "firstName":
      validResults.value.find((obj) => (obj.firstName = payload.value));
      break;
    case "lastName":
      validResults.value.find((obj) => (obj.lastName = payload.value));
      break;
    case "email":
      validResults.value.find((obj) => (obj.email = payload.value));
      break;
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

const enter = (element) => {
  element.style.height = "auto";
  let height = getComputedStyle(element).height;
  element.style.height = 0;
  getComputedStyle(element);
  setTimeout(() => {
    element.style.height = height;
  });
};
const afterEnter = (element) => {
  element.style.height = "auto";
};
const leave = (element) => {
  element.style.height = getComputedStyle(element).height;
  getComputedStyle(element);
  setTimeout(() => {
    element.style.height = 0;
  });
};
</script>

<style lang="scss" scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}
.sidebar-menu-active {
  background-color: #266644;
  color: white;
  border-color: white;
}
</style>
