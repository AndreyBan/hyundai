<template>
  <div class="error-message">Произошла ошибка загрузки данных!</div>
</template>

<script>
export default {
  name: "error"
}
</script>

<style scoped>
.error-message {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  grid-column: 1/5;
  padding: 50px 0;
}
</style>
