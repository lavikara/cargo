<template>
  <div id="auth-view">
    <div class="">
      <div
        class="md:tw-grid md:tw-grid-cols-2 tw-px-4 xs:tw-px-8 md:tw-px-0 xl:tw-pl-20"
      >
        <div class="md:tw-w-[22rem] lg:tw-w-[26rem] md:tw-mx-auto">
          <img
            class="tw-max-w-[12rem] tw-pt-20"
            src="@/assets/img/cargostation.png"
            loading="lazy"
            alt="cargo station"
          />
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <div class="tw-hidden md:tw-flex md:tw-justify-end">
          <img
            v-if="route.name === 'Login'"
            class="tw-h-screen xxxl:tw-w-[90%] tw-object-fill"
            src="@/assets/img/login.png"
            loading="lazy"
            alt="cargo station"
          />
          <img
            v-if="route.name === 'Signup'"
            class="tw-h-screen xxxl:tw-w-[90%] tw-object-fill"
            src="@/assets/img/signup.png"
            loading="lazy"
            alt="cargo station"
          />
          <img
            v-if="route.name === 'Kyc'"
            class="tw-h-screen xxxl:tw-w-[90%] tw-object-fill"
            src="@/assets/img/kyc.png"
            loading="lazy"
            alt="cargo station"
          />
          <img
            v-if="route.name === 'AddMember'"
            class="tw-h-screen xxxl:tw-w-[90%] tw-object-fill"
            src="@/assets/img/addmember.png"
            loading="lazy"
            alt="cargo station"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped></style>
