<template>
  <div class="flex h-screen w-screen flex-wrap bg-slate-50">
    <head-menu class="w-full h-[48px] bg-slate-800 text-white" />
    <main class="w-full h-[calc(100%-48px)] flex">
      <div class="h-full flex-grow overflow-auto">
        <slot></slot>
      </div>
    </main>
  </div>
</template>
