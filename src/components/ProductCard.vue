<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// Defining the interface for a product
// TODO: Maybe move this to external file
interface Product {
  id: number | string
  title: string
  brand: string
  price: number
  thumbnail: string
  description: string
  category: string
  tags: string[]
}

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

const emit = defineEmits<{
  (e: 'add-to-cart', id: number | string): void
}>()

function addToCart() {
  emit('add-to-cart', props.product.id)
}
</script>

<template>
  <div class="card bg-base-200 w-96 shadow-sm">
    <figure>
      <!--: is short for v-bind, meaning dynamically bind attributes and so on-->
      <img :src="product.thumbnail" :alt="product.title" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.title }}</h2>
      <p>
        {{ product.description }}
      </p>
      <div class="card-actions justify-end">
        <!-- @ is short for v-on, a directive which is an event listener-->
        <button @click="addToCart" class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
