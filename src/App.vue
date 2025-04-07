<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!--<header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You didelidid it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>-->
  <div class="page-wrapper">
    <header>
      <nav>
        <div class="navbar bg-base-100 shadow-sm">
          <div class="navbar-start">
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>
                    <RouterLink to="/">Home</RouterLink>
                  </a>
                </li>
                <li>
                  <a>
                    <RouterLink to="/about">About</RouterLink>
                  </a>
                </li>
              </ul>
            </div>
            <a class="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
              <li>
                <a>
                  <RouterLink to="/">Home</RouterLink>
                </a>
              </li>
              <li>
                <a>
                  <RouterLink to="/about">About</RouterLink>
                </a>
              </li>
            </ul>
          </div>
          <div class="navbar-end">
            <a class="btn">Button</a>
          </div>
        </div>
      </nav>
    </header>
  </div>

  <RouterView />
</template>

<style scoped></style>
