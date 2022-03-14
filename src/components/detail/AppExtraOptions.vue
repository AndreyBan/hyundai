<template>
  <div class="extra-options" v-if="options">
    <div class="extra-options__title">
      Особенности
    </div>
    <div class="extra-options__list">
      <AppOptionItem v-for="(opt, i) in options"
                     :key="i"
                     :name="i"
                     :list="opt"/>
    </div>
  </div>
</template>

<script>
import AppOptionItem from "./AppOptionItem";

export default {
  name: "AppExtraOptions",
  props: {
    car: {
      type: Object
    }
  },
  components: {
    AppOptionItem
  },
  data() {
    return {
      options: this.car["configuration_options"],
    }
  }
}
</script>

<style scoped>
.extra-options__title {
  display: inline-block;
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 6px;
  border-bottom: 1px solid #00AAD2;
  margin-bottom: 30px;
}

.extra-options__list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
