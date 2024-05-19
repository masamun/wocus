<script setup lang="ts"></script>

<template>
  <div class="pl-4 pr-2 text-white flex justify-between items-center">
    <nuxt-link to="/">
      HOME
    </nuxt-link>
    <div class="flex h-6 gap-4 mr-2 items-center">
      <nuxt-link
        to="https://github.com/masamun/wocus"
        target="_blank"
        no-rel
      ><img
        src="~/assets/icon/github/github-mark-white.svg"
        class="w-6 h-6"
        alt="wocus github repository"
      ></nuxt-link>
    </div>
  </div>
</template>
