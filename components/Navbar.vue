<script setup lang="ts">
const { $client } = useNuxtApp()

const circleBalance = await $client.circle.getBalance.query()
</script>

<template>
  <div flex items-center justify-between>
    <div flex items-center gap-4>
      <NuxtLink to="/store" font-black tracking-wider uppercase text-blue>
        Equi-Store
      </NuxtLink>
    </div>
    <div flex items-center gap-2>
      <div font-bold tracking-wide font-mono text-indigo>
        Circle Funds Stats:
      </div>
      <div rounded-sm bg-white px-2 py-1 text-sm font-mono text-black shadow-md>
        Available: {{ circleBalance?.available.length }}
      </div>

      <div rounded-sm bg-white px-2 py-1 text-sm font-mono text-black shadow-md>
        Unsettled: {{ circleBalance?.unsettled.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
