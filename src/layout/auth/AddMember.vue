<template>
  <div id="add-member-layout">
    <div class="tw-mt-16">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        Add your team members
      </h3>
      <p class="tw-text-sm tw-mb-8">Invite your team members to join you.</p>
      <div
        class="tw-border tw-border-gray tw-rounded-2xl tw-px-2 tw-py-6 lg:tw-px-6"
      >
        <div class="tw-flex tw-items-center">
          <svg
            width="44"
            height="45"
            viewBox="0 0 44 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="1"
              width="43"
              height="43"
              rx="21.5"
              stroke="#CCD2E0"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M29.9016 14.5983C28.4372 13.1339 26.0628 13.1339 24.5984 14.5983L20.0983 19.0984C18.6339 20.5628 18.6339 22.9372 20.0983 24.4017C20.4092 24.7125 20.7598 24.9565 21.133 25.1348C21.5068 25.3134 21.665 25.7611 21.4865 26.1349C21.3079 26.5086 20.8602 26.6669 20.4865 26.4883C19.9617 26.2376 19.4706 25.8953 19.0377 25.4623C16.9874 23.4121 16.9874 20.0879 19.0377 18.0377L23.5377 13.5377C25.5879 11.4874 28.9121 11.4874 30.9623 13.5377C33.0126 15.5879 33.0126 18.9121 30.9623 20.9623L29.2053 22.7193C28.9124 23.0122 28.4376 23.0122 28.1447 22.7193C27.8518 22.4264 27.8518 21.9515 28.1447 21.6586L29.9016 19.9017C31.3661 18.4372 31.3661 16.0628 29.9016 14.5983ZM22.5135 18.8651C22.6921 18.4914 23.1398 18.3331 23.5135 18.5117C24.0383 18.7624 24.5294 19.1047 24.9623 19.5377C27.0126 21.5879 27.0126 24.9121 24.9623 26.9623L20.4623 31.4623C18.4121 33.5126 15.0879 33.5126 13.0377 31.4623C10.9874 29.4121 10.9874 26.0879 13.0377 24.0377L14.7947 22.2807C15.0876 21.9878 15.5624 21.9878 15.8553 22.2807C16.1482 22.5736 16.1482 23.0485 15.8553 23.3414L14.0983 25.0984C12.6339 26.5628 12.6339 28.9372 14.0983 30.4016C15.5628 31.8661 17.9372 31.8661 19.4017 30.4016L23.9017 25.9016C25.3661 24.4372 25.3661 22.0628 23.9017 20.5983C23.5908 20.2875 23.2402 20.0435 22.867 19.8652C22.4932 19.6866 22.335 19.2389 22.5135 18.8651Z"
              fill="#626C83"
              stroke="#626C83"
              stroke-width="0.5"
              stroke-linecap="round"
            />
          </svg>
          <div class="tw-ml-4">
            <h3 class="tw-max-w-xs tw-font-semibold tw-text-xl">Invite Link</h3>
            <p class="tw-text-sm">
              Share this link to invite your team members
            </p>
          </div>
        </div>
        <TextInput
          class="tw-mt-4"
          name="inviteLink"
          id="inviteLink"
          label="Invite Link"
          placeHolder="Invite Link"
          type="url"
          :copy="true"
          :disabled="true"
        />
      </div>
      <div class="tw-flex tw-justify-center tw-items-center tw-mt-8">
        <span class="tw-w-full tw-border-b tw-border-b-gray-border"></span
        ><span class="tw-text-gray tw-px-2 tw-mb-1">or</span
        ><span class="tw-w-full tw-border-b tw-border-b-gray-border"></span>
      </div>
      <TextInput
        v-if="showEmailInput"
        class="tw-mt-8"
        name="email"
        id="email"
        label="Email"
        placeHolder="example@email.com"
        type="email"
        :clearTextData="clearTextData"
        :showLabel="true"
        :disabled="baseStore.btnLoading"
        @set="setEmail"
        @valid="updateValidResult"
      />
      <p
        v-if="!showEmailInput"
        class="tw-text-white tw-text-center tw-bg-red tw-rounded-2xl tw-py-3 tw-mt-8"
      >
        Please use your invite link to add more members
      </p>
      <div v-if="payload.length > 0" class="tw-flex tw-flex-wrap tw-mt-2">
        <div
          v-for="(email, index) in payload"
          :key="email"
          class="tw-text-white tw-p-2"
        >
          <div
            class="tw-relative tw-flex tw-items-center tw-text-sm tw-bg-purple tw-rounded tw-pl-2 tw-pr-6 tw-py-1"
          >
            {{ email }}
            <CloseGrayIcon
              class="tw-absolute tw-top-[0.2rem] tw-right-[0.2rem] tw-bg-white tw-rounded tw-cursor-pointer tw-ml-1"
              @click="removeEmail(index)"
            />
          </div>
        </div>
      </div>
      <Btn
        class="tw-mt-12"
        title="Finish Setup"
        :btnStyle="baseStore.blueBtn"
        :disabled="baseStore.btnLoading"
        :loading="baseStore.btnLoading"
        @click="addMembers"
      />
      <div class="tw-flex tw-justify-center tw-items-center tw-mt-4">
        <router-link
          :to="{ name: 'Login' }"
          class="tw-font-medium tw-cursor-pointer hover:tw-text-blue tw-transition-all tw-duration-300"
        >
          Skip
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBaseStore } from "@/stores/baseStore.js";
import TextInput from "@/components/general/TextInput.vue";
import SelectInput from "@/components/general/SelectInput.vue";
import Btn from "@/components/general/Btn.vue";
import CloseGrayIcon from "@/components/icons/CloseGrayIcon.vue";

const router = useRouter();
const baseStore = useBaseStore();
const validResults = ref([{ email: false, password: false }]);
const formValid = ref(false);
const clearTextData = ref(false);
const showEmailInput = ref(true);
const email = ref("");
const payload = ref([]);

const addMembers = () => {
  setTimeout(async () => {
    if (!formValid.value) return;
    console.log(payload.value);
  }, 500);
};

const setEmail = (text) => {
  email.value = text;
};

const removeEmail = (index) => {
  console.log(index);
  payload.value.splice(index, 1);
  showEmailInput.value = true;
};

const setFormValid = () => {
  formValid.value = validResults.value.some((result) => {
    if (result.email === true) return true;
  });
};

const updateValidResult = (emittedPayload) => {
  switch (emittedPayload.type) {
    case "email":
      validResults.value.find((obj) => (obj.email = emittedPayload.value));
      if (emittedPayload.value) {
        payload.value.push(email.value);
        clearTextData.value = !clearTextData.value;
        setTimeout(() => {
          if (payload.value.length === 5) showEmailInput.value = false;
        }, 500);
      }
      break;

    default:
      break;
  }
  setFormValid();
};
</script>

<style lang="scss" scoped></style>
