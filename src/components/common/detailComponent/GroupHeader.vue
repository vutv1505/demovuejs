<template>
  <div class="divide-bar">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.divide-bar {
  padding: 2px 8px;
  border-radius: 4px;
  background-color: rgb(242, 242, 242);
}
</style>

<script>
export default {
  name: 'GroupHeader'
}
</script>
