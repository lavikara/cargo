<template>
  <div id="text-input">
    <div class="tw-relative tw-flex tw-flex-col">
      <label :for="label" class="tw-font-medium tw-whitespace-nowrap">
        {{ showLabel ? label : "" }}
      </label>
      <input
        class="tw-w-full tw-bg-white tw-border tw-border-gray-border tw-rounded-2xl tw-transition-all tw-duration-300 focus:tw-border-blue hover:tw-border-blue tw-px-4 tw-py-3 tw-mt-1"
        :class="{
          '!tw-border-red': showError,
          'tw-pl-24': name === 'website',
          '!tw-border-gray-border tw-cursor-not-allowed': disabled,
        }"
        @keyup.enter="validate"
        @blur="validate"
        @input="setInput"
        @focus="setFocus(true)"
        @focusout="setFocus(false)"
        :type="type"
        :placeholder="placeHolder"
        :required="required"
        :name="name"
        :id="id"
        :disabled="disabled"
        v-model="textData"
      />

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
import { useRoute } from "vue-router";

const route = useRoute();
const emit = defineEmits(["set", "valid", "inputFocus", "showPassword"]);

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
  type: { type: String, default: () => "text", required: true },
  passwordToConfirm: { type: String, default: () => "" },
  validatePassword: { type: Boolean, default: () => false },
  readonly: { type: Boolean, default: () => false },
  disabled: { type: Boolean, default: () => false },
});

let textData = ref("");
let textDataValid = ref();
let showError = ref(false);
let errorMsg = ref("");

onMounted(() => {
  textData.value = props.inputValue;
  textData.value === "" ? "" : validate();
});

const setFocus = (value) => {
  emit("inputFocus", { value });
};

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
  textDataValid.value = textData.value.trim().length;

  if (textDataValid.value === 0 && textData.value.length > 0) {
    emit("valid", { type: "passwordReset", value: false });
    emit("valid", { type: "password", value: false });
    showError.value = true;
    errorMsg.value = "Password is invalid";
  } else if (textDataValid.value > 0 && props.validatePassword === true) {
    emit("valid", { type: "passwordReset", value: false });

    if (textData.value.length < 8) {
      showError.value = true;
      errorMsg.value = "minimum of eight characters";
      emit("valid", { type: "hasEightOrMoreCharacters", value: false });
    } else {
      emit("valid", { type: "hasEightOrMoreCharacters", value: true });
    }

    if (textData.value.search(/[a-z]/) == -1) {
      showError.value = true;
      errorMsg.value = "At least one lower case letter";
      emit("valid", { type: "hasLowerCase", value: false });
    } else {
      emit("valid", { type: "hasLowerCase", value: true });
    }

    if (textData.value.search(/[A-Z]/) == -1) {
      showError.value = true;
      errorMsg.value = "At least one upper case letter";
      emit("valid", { type: "hasUpperCase", value: false });
    } else {
      emit("valid", { type: "hasUpperCase", value: true });
    }

    if (textData.value.search(/[0-9]/) == -1) {
      showError.value = true;
      errorMsg.value = "At least one number";
      emit("valid", { type: "hasNumber", value: false });
    } else {
      emit("valid", { type: "hasNumber", value: true });
    }

    if (
      textData.value.search(
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/
      ) == -1
    ) {
      showError.value = true;
      errorMsg.value = "At least one special character";
      emit("valid", { type: "hasSpecialCharacters", value: false });
    } else {
      emit("valid", { type: "hasSpecialCharacters", value: true });
    }
  } else if (textDataValid.value > 0 && props.name === "confirmPassword") {
    if (textData.value !== props.passwordToConfirm) {
      showError.value = true;
      errorMsg.value = "Password doesn't match";
      emit("valid", { type: "passwordMatch", value: false });
    } else {
      emit("valid", { type: "passwordMatch", value: true });
    }
  } else {
    emit("valid", { type: "passwordReset", value: false });
    emit("valid", { type: "password", value: false });
  }
};

const setInput = () => {
  showError.value = false;
  errorMsg.value = "";
  validate();
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
