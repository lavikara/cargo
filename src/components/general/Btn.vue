<template>
  <button
    ref="btnEl"
    type="submit"
    class="tw-flex tw-justify-center tw-items-center tw-text-white tw-font-semibold tw-border tw-border-blue tw-rounded-2xl tw-py-3"
    :class="{
      '!tw-text-gray !tw-bg-green-bg5 tw-cursor-not-allowed': disabled,
    }"
    :style="btnStyle"
    :disabled="disabled"
    @mouseover="setHoverStyle"
    @mouseleave="resetStyle"
  >
    <div class="tw-flex tw-items-center">
      <span v-if="!loading">{{ props.title }}</span>
      <LoadingIcon v-if="loading" />
    </div>
  </button>
</template>

<script setup>
import { ref } from "vue";
import LoadingIcon from "@/components/icons/LoadingIcon.vue";

const props = defineProps({
  title: String,
  btnStyle: { type: Object, default: () => {} },
  loading: { type: Boolean, default: () => false },
  showArrow: { type: Boolean, default: () => false },
  showDownload: { type: Boolean, default: () => false },
  showReport: { type: Boolean, default: () => false },
  disabled: { type: Boolean, default: () => false },
});

const btnEl = ref();

const setHoverStyle = () => {
  if (props.disabled) return;
  btnEl.value.style.color = props.btnStyle.hoverColor;
  btnEl.value.style.backgroundColor = props.btnStyle.hoverBgColor;
  // btnEl.value.style.border = props.btnStyle.hoverBorder
};

const resetStyle = () => {
  if (props.disabled) return;
  btnEl.value.style.color = props.btnStyle.color;
  btnEl.value.style.backgroundColor = props.btnStyle.backgroundColor;
  // btnEl.value.style.border = props.btnStyle.resetHoverBorder
};
</script>

<style lang="scss" scoped></style>
