<script setup lang="ts">

</script>

<template>
  <div flex="~ col" bg-stretch h-screen gap-4 overflow-y-hidden bg-zinc-900 bg-cover bg-no-repeat px-4 py-4 text-white>
    <Navbar />

    <div mx-auto h-full max-w-7xl w-full flex-1 overflow-y-auto>
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
