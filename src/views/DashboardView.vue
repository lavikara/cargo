<template>
  <div id="dashboard-view">
    <!-- <MobileSidebar class="xl:tw-hidden" /> -->
    <!-- <TopHeader /> -->
    <!-- <Sidebar class="tw-hidden xl:tw-block" /> -->
    <!-- <div class="view-container">
      <div class="tw-pt-28 tw-min-h-screen">
        <p>A View</p>
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <div class="main tw-py-6 tw-px-4 lg:tw-px-8 xl:tw-px-">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </div> -->
    <p>Dashboard</p>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "@/layout/navigation/Sidebar.vue";
import MobileSidebar from "@/layout/navigation/MobileSidebar.vue";
import TopHeader from "@/layout/navigation/Header.vue";

const route = useRoute();

const pageTitle = ref("");

const setPageTitle = (routeFullpath) => {
  pageTitle.value = routeFullpath.split("/")[2];
};

watchEffect(() => setPageTitle(route.fullPath));
</script>

<style lang="scss" scoped>
#dashboard-view {
  @include fadeIn;
  height: 100%;
  display: flex;

  .view-container {
    width: 100%;

    @media screen and (min-width: 1280px) {
      width: calc(100% - $side-bar-width);
    }
  }

  .main {
    @media (min-width: 1024px) {
      max-width: 1280px;
      margin-left: auto;
      margin-right: auto;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
