<script setup lang="ts">
const { $client } = useNuxtApp()

const rawCircleBalance = $client.circle.getBalance.useQuery()
await rawCircleBalance.execute()

onMounted(() => {
  setInterval(async () => {
    await rawCircleBalance.refresh()
  }, 3000)
})
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
        Circle Funds Stats ({{ rawCircleBalance.data.value!.available[0].currency }}):
      </div>
      <div rounded-sm bg-white px-2 py-1 text-sm font-mono text-black shadow-md>
        Available:
        <span v-if="rawCircleBalance.data.value?.available.length">
          {{ rawCircleBalance.data.value!.available[0].amount }}
        </span>
        <span>0</span>
      </div>

      <div flex items-center gap-1 rounded-sm bg-white px-2 py-1 text-sm font-mono text-black shadow-md>
        Unsettled:
        <span v-if="rawCircleBalance.data.value?.unsettled.length">
          {{ rawCircleBalance.data.value!.unsettled[0].amount }}
        </span>
        <span>0</span>
      </div>

      <div v-if="rawCircleBalance.status.value === 'pending'" class="i-line-md-loading-twotone-loop" />
    </div>
  </div>
</template>

<style scoped>

</style>
