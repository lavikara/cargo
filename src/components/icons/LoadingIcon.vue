<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100px"
    height="20px"
    viewBox="0 0 400 200"
  >
    <circle
      :fill="props.fillColor"
      :stroke="props.strokeColor"
      stroke-width="2"
      r="40"
      cx="50"
      cy="65"
    >
      <animate
        attributeName="cy"
        calcMode="spline"
        dur="2"
        values="65;135;65;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.4"
      ></animate>
    </circle>
    <circle
      :fill="props.fillColor"
      :stroke="props.strokeColor"
      stroke-width="2"
      r="40"
      cx="200"
      cy="65"
    >
      <animate
        attributeName="cy"
        calcMode="spline"
        dur="2"
        values="65;135;65;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="-.2"
      ></animate>
    </circle>
    <circle
      :fill="props.fillColor"
      :stroke="props.strokeColor"
      stroke-width="2"
      r="40"
      cx="350"
      cy="65"
    >
      <animate
        attributeName="cy"
        calcMode="spline"
        dur="2"
        values="65;135;65;"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        begin="0"
      ></animate>
    </circle>
  </svg>
</template>

<script setup>
const props = defineProps({
  fillColor: { type: String, default: () => "#ffffff" },
  strokeColor: { type: String, default: () => "#ffffff" },
});
</script>
