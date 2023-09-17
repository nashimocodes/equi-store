<script setup lang="ts">
const { $client } = useNuxtApp()

const transactions = await $client.circle.getAllTransactions.query()
</script>

<template>
  <div>
    <h1 pb-4 text-2xl font-black font-sans underline underline-dotted>
      Transactions
    </h1>
    <div grid grid-cols-2 gap-4 px-6 text-sm font-mono text-black>
      <div v-for="transaction in transactions" :key="transaction.id" rounded-md bg-white px-4 py-4>
        <div flex items-center gap-1>
          <h1 font-bold>
            ID:
          </h1>
          <NuxtLink class="hover:underline-double" :to="`/purchase/info/${transaction.id}`" flex items-center gap-1 underline>
            {{ transaction.id }}

            <div i-material-symbols-line-end-arrow />
          </NuxtLink>
        </div>

        <div flex items-center gap-1>
          <h1 font-bold>
            Amount:
          </h1>
          <div>
            {{ transaction.amount.amount }} {{ transaction.amount.currency }}
          </div>
        </div>

        <div flex items-center gap-1>
          <h1 font-bold>
            Status:
          </h1>
          <NuxtLink underline class="hover:underline-double" :to="`/purchase/info/${transaction.id}`">
            {{ transaction.status }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
