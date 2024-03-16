<template>
  <div id="kyc-layout">
    <div class="tw-mt-16">
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
          name="website"
          id="website"
          label="Company Website"
          placeHolder="Company Website"
          type="text"
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
        <SelectInput
          class="tw-mt-4"
          label="Country"
          defaltOption="Country"
          name="country"
          id="country"
          :showLabel="true"
          :list="countryList"
          :disabled="baseStore.btnLoading"
          @set="setCountry"
        />
        <SelectInput
          class="tw-mt-4"
          label="State"
          defaltOption="State"
          name="location"
          id="location"
          :showLabel="true"
          :list="stateList"
          :disabled="stateInputDisabled"
          @set="setState"
        />
        <TextInput
          class="tw-mt-4"
          name="city"
          id="city"
          label="City"
          placeHolder="City/town"
          type="text"
          minLengthLabel="one"
          :minLength="1"
          :showLabel="true"
          :disabled="baseStore.btnLoading"
          @set="setCity"
          @valid="updateValidResult"
        />
        <Btn
          class="tw-mt-8"
          title="Create Account"
          :btnStyle="baseStore.blueBtn"
          :disabled="baseStore.btnLoading"
          :loading="baseStore.btnLoading"
        />
        <!-- @click="router.push({ name: 'AddMember' })" -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useBaseStore } from "@/stores/baseStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import countryRegionData from "@/utils/js/countryRegionData.js";
import TextInput from "@/components/general/TextInput.vue";
import SelectInput from "@/components/general/SelectInput.vue";
import Btn from "@/components/general/Btn.vue";
import { getItem } from "@/utils/storage";

const router = useRouter();
const authStore = useAuthStore();
const baseStore = useBaseStore();
const validResults = ref([
  {
    firstName: false,
    lastName: false,
    companyName: false,
    website: false,
    teamSize: false,
    city: false,
  },
]);
const formValid = ref(false);
const stateInputDisabled = ref(true);
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
      stateInputDisabled.value = false;
    }
  });
  return list;
});

const addKyc = () => {
  setTimeout(async () => {
    if (!formValid.value) return;

    const userId = getItem("userId");
    authStore.submitKyc({ ...payload.value, tierType: 1 }, userId);
  }, 500);
};

const setFirstname = (text) => {
  payload.value.firstName = text;
};

const setLastname = (text) => {
  payload.value.lastName = text;
};

const setCompanyName = (text) => {
  payload.value.companyName = text;
};

const setCompanyWebsite = (text) => {
  payload.value.companyWebsite = text;
};

const setTeamSize = (size) => {
  teamSize.value = size;
  payload.value.teamSize = size;
  validResults.value[0].teamSize = true;
  setFormValid();
};

const setState = (text) => {
  payload.value.state = text;
};

const setCountry = (text) => {
  payload.value.country = text;
};

const setCity = (text) => {
  payload.value.city = text;
};

const setFormValid = () => {
  formValid.value = validResults.value.some((result) => {
    if (
      result.firstName === true &&
      result.lastName === true &&
      result.companyName === true &&
      result.website === true &&
      result.teamSize === true &&
      result.city === true
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
    case "companyName":
      validResults.value.find((obj) => (obj.companyName = payload.value));
      break;
    case "website":
      validResults.value.find((obj) => (obj.website = payload.value));
      break;
    case "city":
      validResults.value.find((obj) => (obj.city = payload.value));
      break;

    default:
      break;
  }
  setFormValid();
};
</script>

<style lang="scss" scoped></style>
