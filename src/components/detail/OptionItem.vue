<template>
    <li :class="{'open': isOpen}" @click="isOpen = !isOpen">
      {{ name }}
      <ul>
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </li>
</template>

<script>
export default {
  name: "OptionItem",
  data: () => ({
    isOpen: false
  }),
  props: ["name", "list"]
}
</script>

<style scoped>

</style>
