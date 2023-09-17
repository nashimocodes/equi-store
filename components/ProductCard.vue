<script setup lang="ts">
import type { Product } from '~/lib/types/Product'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <div relative flex flex-col gap-4 rounded-md bg-white px-4 pb-2 pt-6 text-xs text-black>
    <div absolute right-0 top-0 flex items-center gap-1 rounded-rt-md bg-yellow px-4 py-2>
      <div i-material-symbols-star-outline />
      {{ $props.product.rating.rate }}
    </div>

    <img mx-auto h-24 w-fit :src="$props.product.image" :alt="`${$props.product.title}'s image'`">

    <div truncate text-ellipsis text-center text-xs>
      {{ $props.product.title }}
    </div>

    <div flex items-center justify-between>
      <div
        flex items-center rounded-md bg-lime px-4 py-2
        :class="{
          'w-full text-center justify-center': $route.path === `/purchase/${$props.product.id}`,
        }"
      >
        ${{ $props.product.price }}
      </div>

      <NuxtLink v-if="$route.path !== `/purchase/${$props.product.id}`" :to="`/purchase/${$props.product.id}`" class="flex items-center gap-2 rounded-md bg-indigo px-4 py-2">
        Purchase
        <div i-material-symbols-line-end-arrow />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
