<template>
  <div id="mobile-nav">
    <nav class="navbar">
      <div
        class="navbar-container tw-fixed tw-top-0 tw-p-4 tw-flex tw-items-center tw-w-full tw-justify-between tw-z-50"
      >
        <input
          class="tw-fixed tw-top-8 tw-right-5 md:tw-right-4 tw-opacity-0 tw-w-7 tw-h-5 tw-cursor-pointer tw-z-40"
          type="checkbox"
          name="mobileSidebar"
          id="mobile-sidebar"
          ref="mobileSidebar"
        />
        <div
          class="hamburger-lines tw-fixed tw-top-8 tw-right-5 md:tw-right-4 tw-flex tw-flex-col tw-w-7 tw-h-5 tw-justify-between tw-z-20"
        >
          <span class="line1 tw-h-1 tw-rounded tw-bg-green"></span>
          <span class="line2 tw-h-1 tw-rounded tw-bg-green"></span>
          <span class="line3 tw-h-1 tw-rounded tw-bg-green"></span>
        </div>
        <div
          class="menu-items tw-absolute tw-top-0 tw-left-0 tw-h-screen tw-w-full tw-flex tw-flex-col tw-bg-green-bg1 tw-pt-28 tw-overflow-scroll"
        >
          <SidebarMenu
            class="tw-mb-4"
            title="Dashboard"
            href="Overview"
            :mobile="true"
            @clicked="closeSidebar"
          />

          <SidebarMenu
            class="tw-mb-4"
            title="Team"
            href="Team"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Customers"
            href="AllCustomers"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Cards"
            href="Cards"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Transactions"
            href="Transactions"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Request"
            href="Request"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Wallet"
            :subMenu="walletMenu"
            :mobile="true"
            :showChevronDown="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Configuration"
            href="Charges"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Compliance"
            href="AllCompliance"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            class="tw-mb-4"
            title="Lien"
            href="Lien"
            :mobile="true"
            @clicked="closeSidebar"
          />
          <SidebarMenu
            title="Settings"
            href="AdminProfile"
            :mobile="true"
            @clicked="closeSidebar"
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarMenu from "@/components/navigation/SidebarMenu.vue";

let mobileSidebar = ref();
const walletMenu = ref([
  { title: "Customer Wallets", href: "CustomerWallets" },
  { title: "Internal Wallets", href: "InternalWallets" },
]);
const configurationMenu = ref([
  { title: "Charges", href: "Charges" },
  { title: "Limit", href: "Limit" },
]);

const closeSidebar = (title) => {
  if (title === "Wallet") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
  mobileSidebar.value.checked = false;
};
</script>

<style lang="scss" scoped>
#mobile-nav {
  @media (max-width: 1280px) {
    .navbar-container .hamburger-lines .line1 {
      transform-origin: 0% 0%;
      transition: transform 0.3s ease-in-out;
    }

    .navbar-container .hamburger-lines .line2 {
      transition: transform 0.2s ease-in-out;
    }

    .navbar-container .hamburger-lines .line3 {
      transform-origin: 0% 100%;
      transition: transform 0.3s ease-in-out;
    }

    .navbar .menu-items {
      max-width: 28rem;
      transform: translate(-150%);
      transition: transform 0.5s ease-in-out;
    }

    .navbar .menu-items .faq-btn {
      left: 50%;
      transform: translate(-50%, 0);
    }

    .navbar-container input[type="checkbox"]:checked ~ .menu-items {
      transform: translateX(-0%);
    }

    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
      transform: rotate(38deg);
    }

    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
      transform: scaleY(0);
    }

    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
      transform: rotate(-38deg);
    }
  }
}
</style>
