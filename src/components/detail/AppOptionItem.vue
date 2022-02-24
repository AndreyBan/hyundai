<template>
    <li v-if="name" :class="{'open': isOpen}" @click="isOpen = !isOpen">
      {{ name }}
      <ul>
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </li>
</template>

<script>
export default {
  name: "AppOptionItem",
  data: () => ({
    isOpen: false
  }),
  props: {
    name: {
      type: String,
      default: ""
    },
    list: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
