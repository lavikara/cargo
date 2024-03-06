<template>
  <div id="kyc-layout">
    <div class="tw-pb-20 tw-mt-16">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
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
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-transition-all tw-duration-300 tw-py-3"
              :class="{
                'tw-text-white tw-bg-blue !tw-border-blue': teamSize === 5,
              }"
              @click="setTeamSize(5)"
            >
              1 to 5
            </div>
            <div
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-transition-all tw-duration-300 tw-py-3"
              :class="{
                'tw-text-white tw-bg-blue !tw-border-blue': teamSize === 10,
              }"
              @click="setTeamSize(10)"
            >
              6 to 10
            </div>
            <div
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-transition-all tw-duration-300 tw-py-3"
              :class="{
                'tw-text-white tw-bg-blue !tw-border-blue': teamSize === 30,
              }"
              @click="setTeamSize(30)"
            >
              11 to 30
            </div>
            <div
              class="tw-w-[6rem] tw-flex tw-justify-center tw-text-xs tw-border tw-border-gray tw-rounded-2xl tw-cursor-pointer hover:tw-border-blue tw-transition-all tw-duration-300 tw-py-3"
              :class="{
                'tw-text-white tw-bg-blue !tw-border-blue':
                  teamSize === 'above 30',
              }"
              @click="setTeamSize('above 30')"
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
            :list="stateList"
            :disabled="baseStore.btnLoading"
            @set="setState"
          />
          <SelectInput
            class="tw-col-start-4 tw-mt-6"
            label="Country"
            defaltOption="Country"
            name="role"
            id="role"
            bgColor="gray"
            :rightSide="true"
            :list="countryList"
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
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useBaseStore } from "@/stores/baseStore.js";
import countryRegionData from "@/utils/js/countryRegionData.js";
import TextInput from "@/components/general/TextInput.vue";
import SelectInput from "@/components/general/SelectInput.vue";
import Btn from "@/components/general/Btn.vue";

const router = useRouter();
const baseStore = useBaseStore();
const validResults = ref([{ email: false, password: false }]);
const formValid = ref(false);
const payload = ref({});
const teamSize = ref("");

const countryList = computed(() => {
  let list = [];
  countryRegionData.map((countryObj) => {
    list.push(countryObj.countryName);
  });
  return list;
});

const stateList = computed(() => {
  let list = [];
  countryRegionData.map((countryObj) => {
    if (countryObj.countryName === payload.value.country) {
      countryObj.regions.map((region) => {
        list.push(region.name);
      });
    }
  });
  return list;
});

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
  payload.value.country = text;
};

const setTeamSize = (size) => {
  teamSize.value = size;
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
