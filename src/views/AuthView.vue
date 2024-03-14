<template>
  <div id="auth-view">
    <div>
      <div
        class="lg:tw-grid lg:tw-grid-cols-2 tw-px-4 xs:tw-px-8 lg:tw-px-0 xxxxl:tw-pl-40"
      >
        <div class="md:tw-w-[28rem] lg:tw-w-[26rem] md:tw-mx-auto">
          <img
            class="tw-max-w-[12rem] tw-pt-20"
            src="@/assets/img/cargostation.png"
            loading="lazy"
            alt="cargo station"
          />
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
          <div
            v-if="
              route.name === 'Signup' ||
              route.name === 'Kyc' ||
              route.name === 'AddMember'
            "
            class="container tw-max-w-[18rem] tw-flex tw-justify-between tw-items-center tw-py-16 tw-mx-auto"
          >
            <label class="tw-flex tw-items-center">
              <input
                class="tw-absolute tw-h-0 tw-w-0 tw-opacity-0"
                :checked="kycStep1"
                type="checkbox"
                disabled
              />
              <div
                class="checkmark tw-w-[1.5rem] tw-h-[1.5rem] tw-relative tw-bg-white tw-border-gray tw-border-2 tw-rounded-full tw-transition-all tw-duration-300"
                :class="{ 'input-border !tw-border-blue': kycStep1Active }"
              ></div>
              <span
                class="tw-text-gray tw-text-sm tw-ml-2"
                :class="{
                  '!tw-text-black': kycStep1Active,
                  '!tw-text-blue': kycStep1,
                }"
                >Step 1</span
              >
            </label>
            <div
              class="tw-w-[1rem] tw-border-gray tw-border-l-0 tw-border-r-0 tw-border-b-0 tw-border-t-2"
            ></div>
            <label class="tw-flex tw-items-center">
              <input
                class="tw-absolute tw-h-0 tw-w-0 tw-opacity-0"
                :checked="kycStep2"
                type="checkbox"
                disabled
              />
              <div
                class="checkmark tw-w-[1.5rem] tw-h-[1.5rem] tw-relative tw-bg-white tw-border-gray tw-border-2 tw-rounded-full tw-transition-all tw-duration-300"
                :class="{ 'input-border !tw-border-blue': kycStep2Active }"
              ></div>
              <span
                class="tw-text-gray tw-text-sm tw-ml-2"
                :class="{
                  '!tw-text-black': kycStep2Active,
                  '!tw-text-blue': kycStep2,
                }"
                >Step 2</span
              >
            </label>
            <div
              class="tw-w-[1rem] tw-border-gray tw-border-l-0 tw-border-r-0 tw-border-b-0 tw-border-t-2"
            ></div>
            <label class="tw-flex tw-items-center">
              <input
                class="tw-absolute tw-h-0 tw-w-0 tw-opacity-0"
                :checked="kycStep3"
                type="checkbox"
                disabled
              />
              <div
                class="checkmark tw-w-[1.5rem] tw-h-[1.5rem] tw-relative tw-bg-white tw-border-gray tw-border-2 tw-rounded-full tw-transition-all tw-duration-300"
                :class="{ 'input-border !tw-border-blue': kycStep3Active }"
              ></div>
              <span
                class="tw-text-gray tw-text-sm tw-ml-2"
                :class="{
                  '!tw-text-black': kycStep3Active,
                  '!tw-text-blue': kycStep3,
                }"
                >Step 3</span
              >
            </label>
          </div>
        </div>
        <div class="tw-hidden lg:tw-flex lg:tw-justify-end">
          <img
            v-if="route.name === 'Login'"
            class="tw-fixed tw-w-[50%] xxxxl:tw-w-[40%] tw-h-screen tw-object-cover"
            src="@/assets/img/login.png"
            loading="lazy"
            alt="cargo station"
          />
          <img
            v-if="route.name === 'Signup' || route.name === 'IndividualSignup'"
            class="tw-fixed tw-w-[50%] xxxxl:tw-w-[40%] tw-h-screen tw-object-cover"
            src="@/assets/img/signup.png"
            loading="lazy"
            alt="cargo station"
          />
          <img
            v-if="route.name === 'Kyc' || route.name === 'VerifyEmail'"
            class="tw-fixed tw-w-[50%] xxxxl:tw-w-[40%] tw-h-screen tw-object-cover"
            src="@/assets/img/kyc.png"
            loading="lazy"
            alt="cargo station"
          />
          <img
            v-if="route.name === 'AddMember'"
            class="tw-fixed tw-w-[50%] xxxxl:tw-w-[40%] tw-h-screen tw-object-cover"
            src="@/assets/img/addmember.png"
            loading="lazy"
            alt="cargo station"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const kycStep1 = ref(false);
const kycStep2 = ref(false);
const kycStep3 = ref(false);
const kycStep1Active = ref(false);
const kycStep2Active = ref(false);
const kycStep3Active = ref(false);

const setStep = (routeName) => {
  switch (routeName) {
    case "Signup":
      kycStep1.value = false;
      kycStep2.value = false;
      kycStep3.value = false;
      kycStep1Active.value = true;
      kycStep2Active.value = false;
      kycStep3Active.value = false;
      break;

    case "IndividualSignup":
      kycStep1.value = false;
      kycStep2.value = false;
      kycStep3.value = false;
      kycStep1Active.value = true;
      kycStep2Active.value = false;
      kycStep3Active.value = false;
      break;

    case "Kyc":
      kycStep1.value = true;
      kycStep2.value = false;
      kycStep3.value = false;
      kycStep1Active.value = false;
      kycStep2Active.value = true;
      kycStep3Active.value = false;
      break;

    case "AddMember":
      kycStep1.value = true;
      kycStep2.value = true;
      kycStep3.value = false;
      kycStep1Active.value = false;
      kycStep2Active.value = false;
      kycStep3Active.value = true;
      break;

    default:
      break;
  }
};

watchEffect(() => setStep(route.name));
</script>

<style lang="scss" scoped>
#auth-view {
  /* Hide the default checkbox */

  /* Create a custom checkbox */
  .checkmark {
    --spread: 6px;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background: #007aff;
    border: solid #007aff;
    box-shadow: 0px 0px var(--spread) 2px #007aff;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 0.5rem;
    top: 0.15rem;
    width: 0.4rem;
    height: 0.8rem;
    border: solid #ffffff;
    border-width: 0 0.1rem 0.1rem 0;
    transform: rotate(45deg);
  }

  .input-border {
    box-shadow: 0px 0px var(--spread) 2px #007aff;
  }
}
</style>
