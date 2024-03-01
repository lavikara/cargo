<template>
  <div
    id="pagination"
    class="tw-flex tw-justify-between tw-text-gray-bg2 tw-font-medium tw-text-sm"
  >
    <div class="tw-relative tw-flex tw-items-center tw-pr-9">
      Rows per page:
      <select
        class="tw-absolute tw-right-0 tw-w-[2.3rem] tw-cursor-pointer tw-z-20"
        name="pageSize"
        id="pageSize"
        v-model="pageSize"
        @input="updatePageSize"
      >
        <option v-for="option in pageSizeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <DownChevronIcon class="tw-absolute tw-right-0" />
    </div>
    <div class="tw-flex tw-items-center">
      <span>{{ range }} of {{ totalCount }}</span>
      <LeftChevronIcon
        class="tw-cursor-pointer tw-mr-4 sm:tw-mr-8"
        @click="onPageClick(currentPage - 1)"
      />
      <RightChevronIcon
        class="tw-cursor-pointer"
        @click="onPageClick(currentPage + 1)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DownChevronIcon from "@/components/icons/DownChevronIcon.vue";
import LeftChevronIcon from "@/components/icons/LeftChevronIcon.vue";
import RightChevronIcon from "@/components/icons/RightChevronIcon.vue";

const emit = defineEmits(["pageChange", "pageSizeChange"]);

const props = defineProps({
  currentPage: { type: Number, default: () => 1, required: true },
  totalPage: { type: Number, default: () => 0, required: true },
  totalCount: { type: Number, default: () => 0, required: true },
  pageSize: { type: Number, default: () => 5, required: true },
});

const pageSizeOptions = ref([5, 10, 15, 20, 50]);
const pageSize = props.pageSize;

const range = computed(() => {
  if (props.currentPage === 1 && props.totalCount >= props.pageSize) {
    return `${props.currentPage} - ${props.currentPage * props.pageSize}`;
  } else if (props.currentPage === props.totalPage) {
    return `${(props.currentPage - 1) * props.pageSize + 1} - ${
      props.totalCount
    }`;
  } else {
    return `${(props.currentPage - 1) * props.pageSize + 1} - ${
      props.currentPage * props.pageSize
    }`;
  }
});

const updatePageSize = (event) => {
  const pageSize = event.target.value;
  emit("pageSizeChange", { page: 1, pageSize: Number(pageSize) });
};

const onPageClick = (page) => {
  if (props.currentPage === page || page === 0 || page > props.totalPage) {
    return;
  }
  emit("pageChange", { page, pageSize: props.pageSize });
};
</script>

<style lang="scss" scoped></style>
