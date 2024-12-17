<template>
  <svg class="icon" aria-hidden="true">
    <use v-bind:xlink:href="`#icon-${props.icon}`"></use>
  </svg>
</template>

<script setup>
const props = defineProps({
  icon: String
})
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
