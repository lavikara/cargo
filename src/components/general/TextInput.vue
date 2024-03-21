<template>
  <div id="text-input">
    <div class="tw-relative tw-flex tw-flex-col">
      <label :for="label" class="tw-font-medium tw-whitespace-nowrap">
        {{ showLabel ? label : "" }}
      </label>
      <input
        class="tw-w-full tw-bg-white tw-border tw-border-gray-border tw-rounded-2xl tw-transition-all tw-duration-300 focus:tw-border-blue hover:tw-border-blue tw-px-4 tw-py-3 tw-mt-1"
        :class="{ '!tw-border-red': showError, 'tw-pl-24': name === 'website' }"
        @input="setInput"
        @keypress="type === 'number' || type === 'tel' ? isNumber($event) : ''"
        @keyup.enter="validate"
        @blur="validate"
        :type="type"
        :placeholder="placeHolder"
        :required="required"
        :name="name"
        :id="id"
        :disabled="disabled"
        v-model="textData"
      />
      <PlusGrayIcon
        v-if="route.name === 'AddMember' && props.type === 'email'"
        class="tw-absolute tw-right-4 tw-top-[2.7rem] tw-cursor-pointer"
      />
      <span
        v-if="name === 'website'"
        class="tw-absolute tw-top-[1.82rem] tw-left-[0.05rem] tw-w-20 tw-text-gray tw-bg-gray-border tw-rounded-tl-2xl tw-rounded-bl-2xl tw-px-4 tw-py-[0.75rem]"
        :class="{ '!tw-top-[0.31rem] tw-left-[0.05rem]': !showLabel }"
      >
        https://
      </span>

      <svg
        v-if="name === 'password' || name === 'confirmPassword'"
        class="tw-absolute tw-right-6 tw-bottom-4 tw-cursor-pointer"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="emit('showPassword', { type: props.type })"
      >
        <g id="eye_mini">
          <g id="Union">
            <path
              d="M8 10C9.10457 10 10 9.10459 10 8.00002C10 6.89546 9.10457 6.00002 8 6.00002C6.89543 6.00002 6 6.89546 6 8.00002C6 9.10459 6.89543 10 8 10Z"
              fill="#626C83"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.531404 8.47233C0.413913 8.16701 0.414015 7.82853 0.531688 7.52329C1.68702 4.52633 4.59464 2.40002 7.99887 2.40002C11.4048 2.40002 14.3136 4.52843 15.4678 7.52772C15.5853 7.83304 15.5852 8.17152 15.4675 8.47677C14.3121 11.4737 11.4045 13.6 8.0003 13.6C4.59438 13.6 1.68558 11.4716 0.531404 8.47233ZM11.2003 8.00002C11.2003 9.76734 9.76761 11.2 8.0003 11.2C6.23299 11.2 4.8003 9.76734 4.8003 8.00002C4.8003 6.23271 6.23299 4.80002 8.0003 4.80002C9.76761 4.80002 11.2003 6.23271 11.2003 8.00002Z"
              fill="#626C83"
            />
          </g>
        </g>
      </svg>

      <p class="tw-text-red tw-text-xs tw-absolute tw--bottom-4 tw-right-0">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { isNumber, emailValidation, validateWebsite } from "@/utils/helpers";
import { useRoute } from "vue-router";
import PlusGrayIcon from "@/components/icons/PlusGrayIcon.vue";

const route = useRoute();
const emit = defineEmits(["set", "valid", "showPassword"]);

const props = defineProps({
  inputValue: { type: String, default: () => "" },
  name: { type: String, default: () => "", required: true },
  id: { type: String, default: () => "", required: true },
  required: { type: Boolean, default: () => true },
  border: { type: Boolean, default: () => true },
  placeHolder: { type: String, default: () => "" },
  label: { type: String, default: () => "" },
  background: { type: String, default: () => "" },
  showLabel: { type: Boolean, default: () => false },
  clearTextData: { type: Boolean, default: () => false },
  copy: { type: Boolean, default: () => false },
  maxNumber: { type: Number, default: () => null },
  type: { type: String, default: () => "text", required: true },
  readonly: { type: Boolean, default: () => false },
  disabled: { type: Boolean, default: () => false },
  minLength: { type: Number, default: () => 2 },
  minLengthLabel: { type: String, default: () => "two" },
});

let textData = ref("");
let textDataValid = ref();
let showError = ref(false);
let errorMsg = ref("");

onMounted(() => {
  textData.value = props.inputValue;
  textData.value === "" ? "" : validate();
});

const setTextData = () => {
  setTimeout(() => {
    textData.value = props.inputValue;
    textData.value === "" ? "" : validate();
  }, 500);
};

const clearTextData = (value) => {
  textData.value = "";
};

const validate = () => {
  if (textData.value?.length === 0 && props.type !== "password") return;
  switch (props.type) {
    case "text":
      textDataValid.value = textData.value.trim().length;
      if (textDataValid.value === null || textDataValid.value === 0) {
        showError.value = true;
        errorMsg.value = "Field cannot be empty";
        emit("valid", { type: props.name, value: false });
      } else if (
        textDataValid.value < props.minLength &&
        props.name !== "companyName"
      ) {
        showError.value = true;
        errorMsg.value = `At least ${props.minLengthLabel} characters`;
        emit("valid", { type: props.name, value: false });
      } else if (props.name === "website" || props.name === "website2") {
        urlValidation();
      } else {
        emit("valid", { type: props.name, value: true });
      }
      break;

    case "email":
      textDataValid.value = emailValidation(textData.value);
      if (textDataValid.value === null) {
        showError.value = true;
        errorMsg.value = "Email is invalid";
        emit("valid", { type: "email", value: false });
      } else {
        emit("valid", { type: "email", value: true });
      }
      break;

    case "number":
      textDataValid.value = textData.value > props.maxNumber;
      if (textDataValid.value === true && props.maxNumber !== null) {
        showError.value = true;
        errorMsg.value = `Max amount is ${props.maxNumber}`;
        emit("valid", { type: "number", value: false });
      } else {
        emit("valid", { type: "number", value: true });
      }
      break;

    default:
      break;
  }
};

const urlValidation = () => {
  textDataValid.value = validateWebsite(textData.value);
  if (!textDataValid.value) {
    showError.value = true;
    errorMsg.value = "Url is invalid";
    emit("valid", { type: "website", value: false });
  } else {
    emit("valid", { type: "website", value: true });
  }
};

const setInput = () => {
  showError.value = false;
  errorMsg.value = "";
  emit("set", textData.value);
};

watchEffect(() => setTextData(props.inputValue));
watchEffect(() => clearTextData(props.clearTextData));
</script>

<style lang="scss" scoped>
#text-input {
  input::placeholder {
    color: #9ca3af;
  }
}
</style>
