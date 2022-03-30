<template>
  <section>
    <div class="container">
      <template v-if="loadPage && !error">
        <AppBreadcrumbs :prop-chain-item="[{name: $route.params.model, path: ''}]"/>
        <AppFilter :cars="filterCarList" :model-image="modelImage" :hide-price="hidePrice" :count="countCars" @get-cars="filterCars"/>
        <AppModelCarList :cars="filterCarList" :dealers="dealers" :model="$route.params.model" :hide-price="hidePrice"/>
      </template>
      <AppPreload v-else-if="!loadPage  && !error"/>
      <AppError v-else/>
    </div>
    <AppFormRequest/>
  </section>
</template>

<script>
import AppFilter from "../components/model/AppFilter";
import AppFormRequest from "../components/AppFormRequest";
import AppModelCarList from "../components/model/AppModelCarList";
import AppPreload from "../components/model/AppPreload";
import AppError from "../components/AppError";
import AppBreadcrumbs from "../components/AppBreadcrumbs";


import {mixinFilterProp} from "../components/mixins/AppMixins";

export default {
  name: "ModelPage",
  mixins: [mixinFilterProp],
  components: {
    AppFilter,
    AppFormRequest,
    AppModelCarList,
    AppPreload,
    AppError,
    AppBreadcrumbs
  },
  data() {
    return {
      cars: null,
      countCars: 0,
      error: false,
      filterCarList: [],
      dealers: null,
      loadPage: false,
      hidePrice: false,
      modelImage: '/images/instock/filter-car-img.png',
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'MainPage') {
      this.$emit('clearCache');
    }
    next();
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

    getUpdateFilterCars(cars, filter) {
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
    if (matchMedia('(max-width:767px)').matches) {
      window.scrollTo(0, 0)
    }

    let json = jsonData ? jsonData : false;

    if (json) {
      if (json["model_image"]) {
        this.modelImage = json["model_image"];
      }

      this.hidePrice = json["hide_price"];

      this.cars = json["data"];
      this.dealers = json["city"]["dealers"];
      this.filterCarList = this.filterCars();
      this.countCars = this.filterCarList.length;
      this.loadPage = true;
    }
  }
}
</script>
