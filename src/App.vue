<script setup lang="ts">
const routes = ref(['shop', 'vip', 'okr'])
</script>

<template>
  <main font-sans p="x-10 y-10" text="center gray-700 dark:gray-200">
    <div m-4 flex justify-around text-3xl>
      <RouterLink v-for="(item, index) of routes" :key="index" underline active-class="active" :to="`/${item}`">
        {{ item }}
      </RouterLink>
    </div>
    <RouterView />
  </main>
</template>

<style scoped>
.router-link-exact-active.active {
  color: red;
}
</style>
