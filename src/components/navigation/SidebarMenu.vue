<template>
  <div id="sidebar-menu" class="tw-relative tw-z-30">
    <div @mouseleave="svgColour = false">
      <router-link
        ref="menu"
        :to="{ name: props.href }"
        :disabled="true"
        class="tw-w-full tw-flex tw-text-lg tw-font-medium tw-border-l-2 tw-border-green tw-cursor-pointer hover:tw-text-white tw-transition-all tw-duration-500 tw-py-2 tw-pl-8"
        :class="{
          'tw-flex tw-justify-between': showChevronDown === true,
          'tw-w-full tw-font-semibold tw-border-green-bg1': mobile == true,
          'sidebar-menu-active': activeTab === title,
        }"
        @click.native="mobileEmit(title)"
        @mouseover="svgColour = true"
      >
        <span @mouseover="svgColour = true">{{ title }}</span>
        <svg
          v-if="showChevronDown"
          class="tw-transition-all tw-duration-500 tw-mr-6 tw-mt-1"
          :class="{ 'tw-rotate-180': showSubMenu }"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.4 4.6L2 6L8 12L14 6L12.6 4.6L8 9.2L3.4 4.6Z"
            :fill="svgColour || activeTab === 'Wallet' ? '#ffffff' : '#828282'"
            fill-opacity="0.8"
          />
        </svg>
      </router-link>
      <transition
        name="dropdown"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
      >
        <div v-if="showSubMenu">
          <div>
            <div class="tw-w-full">
              <ul
                v-for="(menu, index) in subMenu"
                :key="index"
                class="tw-w-full"
              >
                <li
                  class="tw-w-full xl:hover:tw-text-green-bg1 tw-cursor-pointer tw-transition-all tw-duration-500 tw-py-2 tw-pl-12"
                  :class="{ 'xl:tw-text-green-bg1': activeIndex === index }"
                  @click="goToSubMenu(menu.href, menu.title, index)"
                >
                  {{ menu.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const emit = defineEmits(["clicked"]);

const props = defineProps({
  title: { type: String, default: () => "", required: true },
  subMenu: { type: Array, default: () => [] },
  href: { type: String, default: () => "" },
  focus: { type: Boolean, default: () => false },
  showChevronDown: { type: Boolean, default: () => false },
  mobile: { type: Boolean, default: () => false },
});

let menu = ref();
let showSubMenu = ref(false);
let activeTab = ref("");
let svgColour = ref(false);
let activeIndex = ref(null);

const mobileEmit = (title) => {
  emit("clicked", title);
  showSubMenu.value = !showSubMenu.value;
};

const goToSubMenu = (href, title, index) => {
  activeIndex.value = index;
  router.push({ name: href });
  emit("clicked", title);
};

const enter = (element) => {
  element.style.height = "auto";
  let height = getComputedStyle(element).height;
  element.style.height = 0;
  getComputedStyle(element);
  setTimeout(() => {
    element.style.height = height;
  });
};
const afterEnter = (element) => {
  element.style.height = "auto";
};
const leave = (element) => {
  element.style.height = getComputedStyle(element).height;
  getComputedStyle(element);
  setTimeout(() => {
    element.style.height = 0;
  });
};

const setActivetab = (route) => {
  activeIndex.value = null;
  showSubMenu.value = false;
  switch (route.name) {
    case "Overview":
      activeTab.value = "Dashboard";
      break;
    case "Team":
      activeTab.value = "Team";
      break;
    case "AllCustomers":
      activeTab.value = "Customers";
      break;
    case "CustomerProfile":
      activeTab.value = "Customers";
      break;
    case "Cards":
      activeTab.value = "Cards";
      break;
    case "Transactions":
      activeTab.value = "Transactions";
      break;
    case "Request":
      activeTab.value = "Request";
      break;
    case "AllCompliance":
      activeTab.value = "Compliance";
      break;
    case "ComplianceDocument":
      activeTab.value = "Compliance";
      break;
    case "CustomerBio":
      activeTab.value = "Compliance";
      break;
    case "AdminProfile":
      activeTab.value = "Settings";
      break;
    case "Charges":
      activeTab.value = "Configuration";
      break;
    case "Limit":
      activeTab.value = "Configuration";
      break;
    case "Provider":
      activeTab.value = "Configuration";
      break;
    case "CustomerWallets":
      activeIndex.value = 0;
      showSubMenu.value = true;
      activeTab.value = "Wallet";
      break;
    case "InternalWallets":
      activeIndex.value = 1;
      showSubMenu.value = true;
      activeTab.value = "Wallet";
      break;
    case "Lien":
      activeTab.value = "Lien";
      break;

    default:
      break;
  }
};

watchEffect(() => setActivetab(route));
</script>

<style lang="scss" scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}
.sidebar-menu-active {
  background-color: #266644;
  color: white;
  border-color: white;
}
</style>
