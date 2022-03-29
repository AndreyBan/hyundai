<template>
  <section class="car-list" v-if="dataLoad">
    <AppCarItem v-for="(el, i) in models" :key="i" :element="el" :type="type" :hide-price="hidePrice"></AppCarItem>
  </section>
  <AppError v-else/>
</template>

<script>
import AppCarItem from "./AppCarItem";
import AppError from "../AppError";

export default {
  name: "AppCarList",
  components: {
    AppCarItem,
    AppError
  },
  props: {
    type: {
      type: String,
      required: true,
      default: ""
    }
  },
  data() {
    return {
      dataModels: null,
      error: false,
      dataLoad: false,
      hidePrice: false
    }
  },
  computed: {
    models() {
      let models = this.dataModels;

      return models.sort((a, b) => {
        return a["min_price"] - b["min_price"];
      })
    }
  },
  mounted() {
    let json = jsonData ? jsonData : false;

    if (json) {
      this.hidePrice = json["hide_price"];
      this.dataModels = json["data"][0]["models"];
      this.dataLoad = true;
    }
  }
}

</script>

<style scoped>
.car-list {
  margin-top: 32px;
  display: -ms-grid;
  display: grid;
  -ms-grid-rows: auto;
  -ms-grid-columns: 1fr 32px 1fr 32px 1fr 32px 1fr;
  grid-template: auto / 1fr 1fr 1fr 1fr;
  grid-column-gap: 32px;

}

@media (max-width: 1280px) {
  .car-list {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template: auto / 1fr 1fr 1fr;
  }
}

@media (max-width: 991px) {
  .car-list {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr 1fr;
    grid-template: auto / 1fr 1fr;
  }
}

@media (max-width: 767px) {
  .car-list {
    -ms-grid-rows: auto;
    -ms-grid-columns: 1fr;
    grid-template: auto / 1fr;
  }
}
</style>
