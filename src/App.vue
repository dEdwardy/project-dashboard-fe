<script setup lang="ts">
const routes = ref(['shop', 'vip', 'okr'])
</script>

<template>
  <main
    font-sans
    p="10"
    text="center gray-700 dark:gray-200"
    class="h-100%"
  >
    <div m-4 h-30px flex justify-around text-3xl line-height-30px>
      <RouterLink
        v-for="(item, index) of routes"
        :key="index"
        underline
        active-class="active"
        :to="`/${item}`"
      >
        {{ item }}
      </RouterLink>
    </div>
    <RouterView class="main" />
  </main>
</template>

<style scoped>
.router-link-exact-active.active {
  color: red;
}
.main {
  height: calc(100% - 50px);
}
</style>
