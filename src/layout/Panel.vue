<template>
  <div class="panel">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {},
};
</script>

<style>
</style>