<template>
  <div>
    <div class="container">
      <AppBreadcrumbs/>
      <section class="section-filter">
        <AppTypeCar @type="getType"/>
      </section>

      <AppCarList :type="filterType"/>
    </div>
    <AppFormRequest/>
  </div>
</template>

<script>
import AppTypeCar from "../components/main-page/AppTypeCar";
import AppCarList from "../components/main-page/AppCarList";
import AppFormRequest from "../components/AppFormRequest";
import AppBreadcrumbs from "../components/AppBreadcrumbs";

export default {
  name: "MainPage",
  data() {
    return {
      filterType: ""
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'ModelPage') {
      this.$emit('addCache');

    }
    next();
  },
  components: {
    AppFormRequest,
    AppTypeCar,
    AppCarList,
    AppBreadcrumbs
  },
  methods: {
    getType(data) {
      this.filterType = data;
    }
  }
}
</script>

<style scoped>
.section-filter {
  padding: 42px 130px 42px 100px;
  box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  display: flex;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  .section-filter {
    padding: 32px 50px 44px;
    flex-direction: column;
  }
}

@media (max-width: 767px) {
  .section-filter {
    padding: 16px 18px 28px;
    flex-direction: column;
  }
}
</style>
