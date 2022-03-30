<template>
  <section class="car-list">
    <template v-if="!dataLoad && !error">
      <AppPreloaderCars v-for="i in 8" :key="i"/>
    </template>
    <template v-else-if="dataLoad && models.length">
      <AppCarItem v-for="(el, i) in models" :key="i" :element="el" :type="type" :hide-price="hidePrice"></AppCarItem>
    </template>
    <div class="not-find-cars" v-else-if="dataLoad && !models.length">По заданным параметрам автомобилей в наличии нет</div>
    <Error v-if="error"/>
  </section>
</template>

<script>
import AppCarItem from "./AppCarItem";
import AppPreloaderCars from "./AppPreloaderCars";
import Error from "../AppError";

export default {
  name: "AppCarList",
  components: {
    AppCarItem,
    AppPreloaderCars,
    Error
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
  methods: {
    setData(data){
      this.hidePrice = data["hide_price"];
      this.dataModels = data["data"][0]["models"];
      this.dataLoad = true;
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
      this.setData(json);

    } else {
      let errorTimeout = setTimeout(() => this.error = true, 5000);

      fetch(this.$requestUrl + '?data=model-list', {method: "POST"})
          .then(res => res.json())
          .then(res => {
            if (res["status"] == "success") {
              this.setData(res);
              clearTimeout(errorTimeout);

            } else {
              this.error = true;
            }
          })
          .catch(e => {
            console.log("Error message: " + e.message)
            this.error = true;
          })
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
