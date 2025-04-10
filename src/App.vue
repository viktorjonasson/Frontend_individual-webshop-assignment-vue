<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore.ts'
import NavBar from '@/components/NavBar.vue'
import { themeChange } from 'theme-change'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
  themeChange(false)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 min-h-screen">
    <NavBar />
    <RouterView />
  </div>
</template>

<style scoped></style>
