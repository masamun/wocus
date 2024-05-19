<template>
  <div class="flex h-screen w-screen flex-wrap bg-slate-50">
    <head-menu class="w-full h-[48px] bg-slate-800 text-white" />
    <main class="w-full h-[calc(100%-48px)] flex">
      <div class="w-32 min-w-32 h-full bg-slate-700 text-white">
        <side-menu />
      </div>
      <div class="h-full flex flex-grow overflow-auto">
        <slot />
      </div>
    </main>
  </div>
</template>
