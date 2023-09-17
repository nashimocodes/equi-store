<script setup lang="ts">
const route = useRoute()
const { $client } = useNuxtApp()
const paymentId = route.params.id

const paymentDetails = await $client.circle.getPaymentDetails.useQuery({
  paymentId: paymentId as string,
})
</script>

<template>
  <div flex flex-col gap-5>
    <h1 text-2xl font-black font-sans underline="~ dotted" text-pink>
      Transaction Details:
    </h1>
    <div flex items-center gap-2>
      <span font-bold>Transaction Status:</span>
      <span>{{ paymentDetails.data.value?.status }}</span>
    </div>

    <div flex items-center gap-2>
      <span font-bold>Description:</span>
      <span>{{ // @ts-ignore description is not in the type
        paymentDetails.data.value?.description }}</span>
    </div>

    <div flex items-center gap-2>
      <span font-bold>Payment Done at:</span>
      <span>{{ dayjs(paymentDetails.data.value?.createDate).format("DD/MM/YYYY hh:mm A") }}</span>
    </div>

    <div flex items-center gap-2>
      <span font-bold>Last status updated at:</span>
      <span>{{ dayjs(paymentDetails.data.value?.createDate).format("DD/MM/YYYY hh:mm A") }}</span>
    </div>

    <div flex items-center gap-2>
      <span font-bold>Amount:</span>
      <span>{{ paymentDetails.data.value?.amount.amount }} {{ paymentDetails.data.value?.amount.currency }}</span>
    </div>

    <div flex items-center gap-2>
      <span font-bold>Circle Fees:</span>
      <span>{{ paymentDetails.data.value?.fees!.amount }} {{ paymentDetails.data.value?.fees!.currency }}      </span>
    </div>

    <div flex items-center gap-2>
      <span font-bold>Merchant ID:</span>
      <span>{{ paymentDetails.data.value?.merchantId }}</span>
    </div>

    <div flex items-center gap-2>
      <span font-bold>Merchant Wallet ID:</span>
      <span>{{ paymentDetails.data.value?.merchantWalletId }}</span>
    </div>

    <div flex flex-col rounded-md bg-zinc-800>
      <div border-b-4 border-b-zinc-900 px-6 py-2>
        <h1 font-bold font-mono>
          Data from API
        </h1>
      </div>
      <div px-6 py-4 text-xs font-mono>
        {{ JSON.stringify(paymentDetails.data.value, null, 2) }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
