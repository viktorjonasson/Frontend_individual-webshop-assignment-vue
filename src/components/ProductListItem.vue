<script setup lang="ts">
import { defineProps } from 'vue'
import type { Product } from '@/product-services/product-dto.ts'

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true,
    validator(value: never): boolean {
      return [
        'id',
        'title',
        'brand',
        'price',
        'thumbnail',
        'description',
        'category',
        'tags',
      ].every((key) => key in value)
    },
  },
})
</script>

<template>
  <li class="flex py-6">
    <div class="size-24 shrink-0 overflow-hidden rounded-md border border-base-200 bg-base-300">
      <img :src="product.thumbnail" :alt="product.title" class="size-full object-cover" />
    </div>

    <div class="ml-4 flex flex-1 flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <p>{{ product.title }}</p>
          </h3>
          <p class="ml-4">{{ product.price }}</p>
        </div>
        <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
      </div>
      <div class="flex flex-1 items-end justify-between text-sm">
        <p class="text-gray-500">Qty 1</p>

        <div class="flex">
          <button type="button" class="font-medium text-primary-content hover:text-primary">
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
</template>
