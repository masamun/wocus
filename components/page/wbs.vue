<template>
  <div class="flex flex-wrap">
    <!-- 左側 -->
    <div>
      <milestone-operator />
      <div class="pl-24 pr-8 flex">
        <!-- ヘッダー -->
        <!-- メタ情報 -->
        <milestone-field-row class="border-l" />
        <date-summary-columns />
      </div>
      <task-rows />
    </div>
  </div>
</template>
