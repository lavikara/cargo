<template>
  <div id="kyc-layout">
    <div class="tw-pb-20 tw-mt-16">
      <h3 class="tw-max-w-xs tw-font-semibold tw-text-xl tw-mb-4">
        You’re almost there!
      </h3>
      <p class="tw-text-sm tw-mb-8">
        Just a few more details and you are good to go.
      </p>
      <form @submit.prevent="addKyc">
        <TextInput
          name="yourName"
          id="yourName"
          label="Your Name"
          placeHolder="Your Name"
          type="text"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @set="setName"
          @valid="updateValidResult"
        />
        <TextInput
          class="tw-mt-4"
          name="companyName"
          id="companyName"
          label="Company Name"
          placeHolder="Company Name"
          type="text"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @set="setCompanyName"
          @valid="updateValidResult"
        />
        <TextInput
          class="tw-mt-4"
          name="companyWebsite"
          id="companyWebsite"
          label="Company Website"
          placeHolder="Company Website"
          type="url"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @set="setCompanyWebsite"
          @valid="updateValidResult"
        />
        <div class="tw-mt-4">
          <label for="team size" class="tw-font-medium tw-whitespace-nowrap">
            Team Size
          </label>
          <div class="tw-flex tw-justify-between tw-mt-1">
            <div
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-py-3"
            >
              1 to 5
            </div>
            <div
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-py-3"
            >
              6 to 10
            </div>
            <div
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-py-3"
            >
              11 to 30
            </div>
            <div
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-py-3"
            >
              Above 30
            </div>
          </div>
        </div>
        <div class="tw-grid tw-grid-cols-4 tw-mt-4">
          <SelectInput
            class="tw-col-start-1 tw-col-end-4"
            label="Location"
            defaltOption="State"
            name="location"
            id="location"
            :showLabel="true"
            :leftSide="true"
            :list="roles"
            :disabled="baseStore.btnLoading"
            @set="setState"
          />
          <SelectInput
            class="tw-col-start-4 tw-mt-6"
            defaltOption="Country"
            name="role"
            id="role"
            bgColor="gray"
            :showLabel="true"
            :rightSide="true"
            :list="roles"
            :disabled="baseStore.btnLoading"
            @set="setCountry"
          />
        </div>
        <Btn
          class="tw-mt-8"
          title="Create Account"
          :btnStyle="baseStore.blueBtn"
          :disabled="baseStore.btnLoading"
          :loading="baseStore.btnLoading"
          @click="router.push({ name: 'AddMember' })"
        />
      </form>
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

const router = useRouter();
const baseStore = useBaseStore();
const validResults = ref([{ email: false, password: false }]);
const formValid = ref(false);
const payload = ref({});

const addKyc = () => {
  setTimeout(async () => {
    if (!formValid.value) return;
  }, 500);
};

const setName = (text) => {
  payload.value.username = text;
};

const setCompanyName = (text) => {
  payload.value.password = text;
};

const setCompanyWebsite = (text) => {
  payload.value.password = text;
};

const setState = (text) => {
  payload.value.password = text;
};

const setCountry = (text) => {
  payload.value.password = text;
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
</script>

<style lang="scss" scoped></style>
