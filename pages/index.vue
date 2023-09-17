<script setup lang="ts">

</script>

<template>
  <div class="font-inter h-screen flex flex-col items-center justify-center gap-3 bg-zinc-900 text-4xl font-black tracking-wider uppercase text-white">
    <h1 text-2xl text-blue underline underline-dashed>
      equi-Store
    </h1>

    <h1>
      Your Own Store-front
    </h1>

    <h2 text-lg text-gray>
      Easy Payments By
    </h2>

    <img h-8 src="https://6778953.fs1.hubspotusercontent-na1.net/hubfs/6778953/Brand/Circle/circle-logo-color.png" alt="">

    <NuxtLink to="/store" class="text-sm" mt-4 flex items-center gap-2 rounded-md bg-indigo px-4 py-2>
      Continue to Store
      <div i-material-symbols-line-end-arrow />
    </NuxtLink>
  </div>
</template>

<style scoped>
</style>
