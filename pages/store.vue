<script setup lang="ts">
import type { Product } from '~/lib/types/Product'

onMounted(async () => {
  if (!products.value.length) {
    const data = await useFetch('https://fakestoreapi.com/products')
    if (!data)
      return console.error('Failed to fetch products')

    products.value = data.data.value as Product[]
  }
})
</script>

<template>
  <div flex flex-col gap-4 font-mono>
    <h1 text-3xl font-bold underline="~ dotted" text-indigo>
      Store
    </h1>

    <div v-if="products.length" grid grid-cols-4 gap-4>
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else flex items-center gap-2 text-gray>
      <div i-line-md-loading-alt-loop />
      Loading
    </div>
  </div>
</template>

<style scoped>

</style>
