<template>
  <div id="verify-email-layout">
    <div class="tw-pb-20 tw-mt-16">
      <h3
        class="tw-max-w-xs tw-font-semibold tw-text-xl lg:tw-text-2xl tw-mb-4"
      >
        Email has been verified
      </h3>
      <p class="tw-text-sm">
        Enjoy our services from small parcels to large freight, our customized
        logistics solutions are designed to meet your specific requirements.
      </p>

      <h3 class="tw-text-sm tw-mt-8 tw-mb-8">Redirecting...</h3>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";

const redirectToLogin = () => {
  // Verify token
  // If invalid token or expired, redirect to RequestEmailVerificationToken
  // If valid token, redirect to Login
  setTimeout(async () => {
    router.replace({ name: "Login" });
  }, 3000);
};
redirectToLogin();
</script>

<style lang="scss" scoped></style>
