<template>
  <section class="car-list">
    <template v-if="!dataLoad && !error">
      <AppPreloaderCars v-for="i in 8" :key="i"/>
    </template>
    <template v-else>
      <AppCarItem v-for="(el, i) in models" :key="i" :element="el" :type="type"></AppCarItem>
    </template>
    <Error v-if="error"/>
  </section>
</template>

<script>
import AppCarItem from "./AppCarItem";
import AppPreloaderCars from "./AppPreloaderCars";
import Error from "../AppError";

export default {
  name: "CarList",
  components: {
    AppCarItem,
    AppPreloaderCars,
    Error
  },
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dataModels: null,
      error: false,
      dataLoad: false
    }
  },
  computed: {
    models(){
      let models = this.dataModels;

      return models.sort((a, b) => {
        return a["min_price"] - b["min_price"];
      })
    }
  },
  mounted() {
    fetch('https://agat-hyundai.ru/ajax/api_instock.php?data=model-list', {method: "POST"})
        .then(res => res.json())
        .then(res => {
          if (res["status"] == "success") {
            this.dataModels = res["data"][0]["models"];
            this.dataLoad = true;
          } else {
            this.error = true;
          }
        })
        .catch(e => {
          console.log("Error message: " + e.errorText)
          this.error = true;
        })
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
