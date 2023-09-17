<script setup lang="ts">
import type { DetailedPayment } from '@circle-fin/circle-sdk'
import type { Product } from '~/lib/types/Product'

const { $client } = useNuxtApp()
const route = useRoute()
const rawProductData = await useFetch(`https://fakestoreapi.com/products/${route.params.id}`)
const product = await rawProductData.data.value as Product

const processingPayment = ref(false)
const cardNumber = ref('4200000000000000')
const cardCvv = ref('666')
const cardExpMonth = ref('12')
const cardExpYear = ref('2024')
const cardName = ref('Sarabhai Motabhai')
const cardCity = ref('San Francisco')
const cardCountry = ref('US')
const cardLine1 = ref('123 Main St')
const cardPostalCode = ref('94103')
const cardDistrict = ref('CA')
const amount = ref(product.price)

const creationResponse = ref<DetailedPayment | undefined>(undefined)
const createCardMutation = $client.circle.createPayment

async function processPayment() {
  processingPayment.value = true
  const responseData = await createCardMutation.mutate({
    orderTitle: product.title,
    number: cardNumber.value,
    cvv: cardCvv.value,
    expMonth: cardExpMonth.value,
    expYear: cardExpYear.value,
    amount: amount.value,
    billingDetails: {
      name: cardName.value,
      city: cardCity.value,
      country: cardCountry.value,
      line1: cardLine1.value,
      postalCode: cardPostalCode.value,
      district: cardDistrict.value,
    },
  })

  creationResponse.value = responseData
  processingPayment.value = false
}
</script>

<template>
  <div text-mono grid grid-cols-12 gap-6 font-mono>
    <div col-span-10 flex flex-col gap-4 text-sm>
      <div flex items-center gap-1>
        Good Choice, <span font-bold>{{ product.title }}</span>
      </div>

      <div flex flex-col gap-2 py-4>
        <h1 text-2xl font-black tracking-wide font-sans text-lime underline underline-dashed>
          Enter Payment Details
        </h1>
        <div>Powered by Circle</div>
      </div>

      <div grid grid-cols-3 gap-6>
        <div flex items-center gap-2>
          <div>Card Number</div>
          <input v-model="cardNumber" rounded-md px-2 py-1 text-black placeholder="Card Number">
        </div>

        <div flex items-center gap-2>
          <div>CVV</div>
          <input v-model="cardCvv" rounded-md px-2 py-1 text-black placeholder="CVV">
        </div>

        <div flex items-center gap-2>
          <div>Exp Month</div>
          <input v-model="cardExpMonth" rounded-md px-2 py-1 text-black placeholder="Exp Month">
        </div>

        <div flex items-center gap-2>
          <div>Exp Year</div>
          <input v-model="cardExpYear" rounded-md px-2 py-1 text-black placeholder="Exp Year">
        </div>
      </div>

      <div id="name" grid grid-cols-3 gap-6 pt-4>
        <div flex items-center gap-2>
          <div>Name</div>
          <input v-model="cardName" rounded-md px-2 py-1 text-black placeholder="Name">
        </div>

        <div flex items-center gap-2>
          <div>City</div>
          <input v-model="cardCity" rounded-md px-2 py-1 text-black placeholder="City">
        </div>

        <div flex items-center gap-2>
          <div>Country</div>
          <input v-model="cardCountry" rounded-md px-2 py-1 text-black placeholder="Country">
        </div>

        <div flex items-center gap-2>
          <div>Line 1</div>
          <input v-model="cardLine1" rounded-md px-2 py-1 text-black placeholder="Line 1">
        </div>

        <div flex items-center gap-2>
          <div>Postal Code</div>
          <input v-model="cardPostalCode" rounded-md px-2 py-1 text-black placeholder="Postal Code">
        </div>

        <div flex items-center gap-2>
          <div>District</div>
          <input v-model="cardDistrict" rounded-md px-2 py-1 text-black placeholder="District">
        </div>

        <div flex items-center gap-2>
          <div>Amount</div>
          <input v-model="amount" disabled rounded-md px-2 py-1 text-black placeholder="Amount">
        </div>
      </div>

      <button w-full flex items-center justify-center rounded-full bg-blue py-1 text-2xl @click="processPayment()">
        <span v-if="processingPayment">
          <div i-line-md-loading-twotone-loop />
        </span>
        <span v-else>
          Pay!
        </span>
      </button>

      <span text-white>
        {{
          JSON.stringify(creationResponse, null, 2)
        }}
      </span>
    </div>
    <div col-span-2 h-fit>
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<style scoped>

</style>
