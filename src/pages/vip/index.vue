<script setup lang="ts">
const imgs: string[] = Array.from({ length: 100 }).fill(undefined).map((_, index) => `${index}`)
</script>

<template>
  <div>
    <div>vip</div>
    1.图片懒加载
    2.DynamicForm (vue2 json schema)
    3.前端水印
    4.webpack 优化
    <a-tabs lazy-load>
      <a-tab-pane key="1" title="1.图片懒加载">
        <div class="grid grid-cols-3 gap-4">
          <img v-for="(src, index) of imgs" :key="index" v-lazy="src" class="h-100 w-100">
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="2.DynamicForm (vue2 json schema)">
        DynamicForm
      </a-tab-pane>
      <a-tab-pane key="3" title="3.前端水印">
        WaterMark
      </a-tab-pane>
      <a-tab-pane key="4" title="4.webpack 优化">
        Webpack优化
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
