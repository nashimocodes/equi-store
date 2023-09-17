<script setup lang="ts">

</script>

<template>
  <div flex="~ col" bg-stretch h-screen gap-4 overflow-y-hidden bg-zinc-900 bg-cover bg-no-repeat px-4 py-4 text-white>
    <Navbar />

    <slot />
  </div>
</template>

<style scoped>

</style>
