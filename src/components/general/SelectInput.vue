<template>
  <div id="select-input">
    <div class="tw-relative tw-flex tw-flex-col">
      <label :for="label" class="tw-font-medium tw-whitespace-nowrap">
        {{ showLabel ? label : "" }}
      </label>
      <select
        ref="select"
        class="tw-w-full tw-bg-white tw-border tw-border-gray-border tw-rounded-2xl tw-cursor-pointer focus:tw-border-blue hover:tw-border-blue tw-px-4 tw-py-3 tw-mt-1"
        :class="{
          '!tw-bg-gray-border': bgColor === 'gray',
          '!tw-cursor-not-allowed': disabled,
          '!tw-rounded-tr-none !tw-rounded-br-none': leftSide,
          '!tw-rounded-tl-none !tw-rounded-bl-none': rightSide,
          'select-appearance': !appearance,
          '!tw-px-2 !tw-py-3': appearance,
        }"
        :name="name"
        :id="id"
        v-model="optionData"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
      >
        <option value="" disabled selected>
          {{ defaltOption }}
        </option>
        <option v-for="(item, index) in list" :value="item" :key="index">
          <p>
            {{ item }}
          </p>
        </option>
      </select>
      <svg
        v-if="!appearance"
        class="tw-absolute tw-right-2 tw-bottom-[1.3rem] tw-z-10"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.99992 2.82901L7.82792 1.33514e-05L9.24292 1.41401L4.99992 5.65701L0.75692 1.41401L2.17192 1.33514e-05L4.99992 2.82901Z"
          fill="#4F5877"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch, onMounted } from "vue";

const emit = defineEmits(["set"]);

const props = defineProps({
  label: { type: String, default: () => "", required: true },
  showLabel: { type: Boolean, default: () => false },
  required: { type: Boolean, default: () => true },
  readonly: { type: Boolean, default: () => false },
  disabled: { type: Boolean, default: () => false },
  clearOption: { type: Boolean, default: () => false },
  tableHeader: { type: Boolean, default: () => false },
  appearance: { type: Boolean, default: () => false },
  leftSide: { type: Boolean, default: () => false },
  rightSide: { type: Boolean, default: () => false },
  bgColor: { type: String, default: () => "" },
  name: { type: String, default: () => "" },
  id: { type: String, default: () => "" },
  defaltOption: { type: String, default: () => "" },
  list: { type: Array, default: () => [], required: true },
});

let select = ref();
let optionData = ref("");

onMounted(() => {
  optionData.value = "";
  emitOption(optionData.value);
});

const emitOption = (option) => {
  emit("set", option);
};

const setOptionData = (value) => {
  optionData.value = value;
  emitOption(value);
};

const clearOptionData = () => {
  optionData.value = "";
};

// watchEffect(() => setOptionData(optionData.value));
// watchEffect(() => setOptionData(props.option));
// watchEffect(() => clearOptionData(props.clearOption));
watch(
  () => props.clearOption,
  () => {
    clearOptionData(props.clearOption);
  }
);
watch(
  () => optionData.value,
  (newVal, oldVal) => {
    setOptionData(newVal);
  }
);
</script>

<style lang="scss" scoped></style>
