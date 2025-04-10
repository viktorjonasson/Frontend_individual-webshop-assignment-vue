<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore.ts'

const cartStore = useCartStore()
</script>

<template>
  <header class="sticky top-0 z-50">
    <nav>
      <div class="navbar bg-base-100 border-b-2 border-base-300 px-0">
        <div class="flex-1">
          <div class="flex flex-wrap gap-x-10 items-center">
            <div class="flex gap-x-2 items-center hover:text-base-content/50">
              <a class="text-xl">
                <RouterLink to="/">Mock<span class="font-bold">Shop</span></RouterLink>
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </div>
            <div class="flex gap-x-4">
              <a class="hover:text-base-content/50">
                <RouterLink to="/">Products</RouterLink>
              </a>
              <a class="hover:text-base-content/50">
                <RouterLink to="/">Support</RouterLink>
              </a>
              <a class="hover:text-base-content/50">
                <RouterLink to="/">About us</RouterLink>
              </a>
            </div>
          </div>
        </div>
        <div class="flex-none flex gap-x-5">
          <div class="pt-0.5">
            <label class="toggle cursor-pointer text-base-content hover:text-base-content/50">
              <input
                type="checkbox"
                class="hidden"
                data-toggle-theme="cupcake,dim"
                data-act-class="toggle-primary"
              />
              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="swap-on"
              >
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="swap-off"
              >
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
          </div>
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle"
            aria-label="Go to shopping cart"
          >
            <RouterLink to="/cart">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="badge badge-sm badge-primary indicator-item">
                  {{ cartStore.cartCount }}
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
