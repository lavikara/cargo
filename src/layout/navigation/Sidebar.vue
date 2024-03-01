<template>
  <div id="sidebar" class="tw-hidden xl:tw-inline-block tw-z-10">
    <div
      class="sidebar-container tw-fixed tw-h-screen tw-bg-green tw-overflow-y-scroll tw-pb-16"
    >
      <nav
        class="tw-h-[80%] tw-w-full tw-flex tw-flex-col tw-justify-between tw-mt-28"
      >
        <div class="tw-w-full">
          <SidebarMenu class="tw-mb-4" title="Dashboard" href="Overview" />
          <SidebarMenu class="tw-mb-4" title="Team" href="Team" />
          <SidebarMenu class="tw-mb-4" title="Customers" href="AllCustomers" />
          <SidebarMenu class="tw-mb-4" title="Cards" href="Cards" />
          <SidebarMenu
            class="tw-mb-4"
            title="Transactions"
            href="Transactions"
          />
          <SidebarMenu class="tw-mb-4" title="Request" href="Request" />
          <SidebarMenu
            class="tw-mb-4"
            title="Wallet"
            :subMenu="walletMenu"
            :showChevronDown="true"
          />
          <SidebarMenu class="tw-mb-4" title="Configuration" href="Charges" />
          <SidebarMenu
            class="tw-mb-4"
            title="Compliance"
            href="AllCompliance"
          />
          <SidebarMenu class="tw-mb-4" title="Lien" href="Lien" />
        </div>
        <div class="tw-w-full">
          <SidebarMenu title="Settings" href="AdminProfile" />
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarMenu from "@/components/navigation/SidebarMenu.vue";

const walletMenu = ref([
  { title: "Customer Wallets", href: "CustomerWallets", activeTab: "Walet" },
  { title: "Internal Wallets", href: "InternalWallets", activeTab: "Walet" },
]);
const configurationMenu = ref([
  { title: "Charges", href: "Charges", activeTab: "Configuration" },
  { title: "Limit", href: "Limit", activeTab: "Configuration" },
]);
</script>

<style lang="scss" scoped>
#sidebar {
  width: $side-bar-width;

  .sidebar-container {
    width: $side-bar-width;
  }
}
</style>
