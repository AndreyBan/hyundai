<template>
  <section>
    <div class="container">
      <template v-if="loadPage && !error">
          <AppFilter :cars="filterCarList" :count="countCars" @get-cars="filterCars"/>
        <AppModelCarList :cars="filterCarList" :model="$route.params.model"/>
      </template>
      <AppPreload v-else-if="!loadPage  && !error"/>
      <AppError v-else/>
    </div>
    <AppFormRequest/>
  </section>
</template>

<script>
import AppFilter from "./model/AppFilter";
import AppFormRequest from "./main-page/AppFormRequest";
import AppModelCarList from "./model/AppModelCarList";
import AppPreload from "./model/AppPreload";
import AppError from "./AppError";

import {mixinFilterProp} from "./mixins/AppMixins";


export default {
  name: "ModelList",
  mixins: [mixinFilterProp],
  components: {
    AppFilter,
    AppFormRequest,
    AppModelCarList,
    AppPreload,
    AppError
  },
  data() {
    return {
      cars: null,
      countCars: 0,
      error: false,
      filterCarList: [],
      loadPage: false
    }
  },
  methods: {
    filterCars(filter = undefined) {
      let cars = this.cars;

      if (filter) {
        this.filterCarList = this.getUpdateFilterCars(cars, filter);
        this.countCars = this.filterCarList.length;

        return this.filterCarList;

      } else return cars;
    },

    getUpdateFilterCars(cars, filter){
      let {colors, year_of_manufacture, price} = filter;

      return cars.filter(el => {

        for (let i in filter) {
          if (!["colors", "year_of_manufacture", "price"].includes(i)) {

            if (el[i]) {
                if (filter[i] && !filter[i].includes(el[i])) return false;
            } else return false;
          }
        }

        if (el["price"] > price.priceMax || el["price"] < price.priceMin) return false;

        return !(!this.filterProp(el["year_of_manufacture"], year_of_manufacture)
            || !this.filterProp(el["color"], colors));

      });
    }
  },
  mounted() {
    fetch('https://agat-hyundai.ru/ajax/api_instock.php?data=model-cars&model=' + this.$route.params.model, {method: 'POST'})
        .then(res => res.json())
        .then(res => {
          if (res["status"] == "success") {
            this.cars = res["data"];
            this.filterCarList = this.filterCars();
            this.countCars = this.filterCarList.length;
            this.loadPage = true;

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
