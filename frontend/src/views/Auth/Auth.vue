<script setup lang="ts">

</script>

<template>
  <div class="box-auth my-flex">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.box-auth {
  height: 100%;
  background: radial-gradient(
    100% 193.51% at 100% 0,
    #EDF4F8 0%, #EFF2FA 16.92%,
    #FAEFF6 34.8%, #FAE6F2 48.8%,
    #FAF0F7 63.79%, #F1F1FB 81.34%,
    #F0F4F8 100%
  );
}
</style>
