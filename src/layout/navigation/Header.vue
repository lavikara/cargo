<template>
  <div
    id="header"
    class="tw-w-full tw-fixed tw-flex xl:tw-bg-white tw-py-2 tw-z-20"
  >
    <div class="left">
      <img
        src="@/assets/img/logo.svg"
        class="tw-h-[30px] tw-cursor-pointer tw-ml-8"
        alt="tegs"
        loading="lazy"
        @click="router.push({ name: 'Login' })"
      />
    </div>
    <div class="right tw-flex tw-justify-center xl:tw-justify-end">
      <svg
        class="tw-cursor-pointer tw-mt-3 tw-mr-3 sm:tw-mr-6"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 15H20V17H0V15H2V8C2 5.87827 2.84285 3.84344 4.34315 2.34315C5.84344 0.842855 7.87827 0 10 0C12.1217 0 14.1566 0.842855 15.6569 2.34315C17.1571 3.84344 18 5.87827 18 8V15ZM7 19H13V21H7V19Z"
          fill="#4F5877"
        />
      </svg>
      <div
        class="tw-h-[50px] tw-w-[50px] tw-bg-green-bg3 tw-rounded-full tw-border-white tw-border-2 tw-mr-16"
      >
        <h3
          class="tw-relative tw-flex tw-justify-center tw-font-medium tw-text-white tw-text-lg tw-mt-2"
        >
          <span class="tw-capitalize"> </span>
          <div class="tw-absolute tw-top-2 tw--right-5 tw-cursor-pointer">
            <svg
              @mouseover="showDropdown = !showDropdown"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4628 5.80625C13.4246 5.71525 13.3603 5.63761 13.278 5.58311C13.1957 5.52861 13.0991 5.49969 13.0003 5.5H3.00034C2.90163 5.49969 2.80503 5.52861 2.72273 5.58311C2.64042 5.63761 2.57609 5.71525 2.53784 5.80625C2.50182 5.89861 2.49268 5.99927 2.51148 6.09661C2.53029 6.19394 2.57626 6.28396 2.64409 6.35625L7.64409 11.3563C7.73966 11.4487 7.8674 11.5003 8.00034 11.5003C8.13328 11.5003 8.26102 11.4487 8.35659 11.3563L13.3566 6.35625C13.4244 6.28396 13.4704 6.19394 13.4892 6.09661C13.508 5.99927 13.4989 5.89861 13.4628 5.80625Z"
                fill="#4F5877"
              />
            </svg>
            <ul
              v-if="showDropdown"
              class="tw-w-32 tw-absolute tw--right-5 tw-top-0 tw-bg-white tw-shadow tw-rounded-lg tw-py-4 tw-border"
              @mouseleave="showDropdown = !showDropdown"
            >
              <li
                class="tw-bg-green-bg1 tw-text-center tw-font-medium tw-rounded-lg tw-cursor-pointer hover:tw-bg-green hover:tw-text-white tw-py-2 tw-mx-4"
                @click="authStore.logout()"
              >
                Logout
              </li>
            </ul>
          </div>
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const showDropdown = ref(false);
</script>

<style lang="scss" scoped>
#header {
  .left {
    width: $side-bar-width;
  }
  .right {
    width: 100%;

    @media screen and (min-width: 1280px) {
      width: calc(100% - $side-bar-width);
    }
  }
}
</style>
