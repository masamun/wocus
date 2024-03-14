<script setup lang="ts">
definePageMeta({
  layout: "project",
});
/**
 * プロジェクトに属するマイルストーン
 * タスクを表示する
 */
</script>

<template>
  <div class="mt-4 mb-4">
    <div class="flex flex-wrap">
      <!-- 左側 -->
      <div>
        <milestone-operator />
        <div class="pl-24 pr-8 flex">
          <!--ヘッダー-->
          <!--メタ情報-->
          <milestone-field-row class="border-l" />
          <date-summary-columns />
        </div>
        <task-rows />
      </div>
    </div>
  </div>
</template>
~/types/date
