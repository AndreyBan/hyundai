<template>
  <section>
    <div class="container">
      <template v-if="loadPage && !error">
        <AppBreadcrumbs :prop-chain-item="[{name: $route.params.model, path: ''}]"/>
        <AppFilter :cars="filterCarList" :model-image="modelImage" :count="countCars" @get-cars="filterCars"/>
        <AppModelCarList :cars="filterCarList" :dealers="dealers" :model="$route.params.model"/>
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
      modelImage: '/images/instock/filter-car-img.png',
      metaData: {
        title: 'Hyundai в наличии',
        description: 'Hyundai в наличии - характеристики, цена, скидки.',
      },
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'MainPage') {
      this.$emit('clearCache');
    }
    next();
  },

  metaInfo() {
    return {
      title: this.metaData.title,
      meta: [
        {vmid: 'description', property: 'description', content: this.metaData.description},
        {vmid: 'og:title', property: 'og:title', content: this.metaData.title},
        {vmid: 'og:description', property: 'og:description', content: this.metaData.description},
      ],
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
    let errorTimeout = setTimeout(() => this.error = true, 5000);

    fetch(this.$requestUrl + '?data=model-cars&model=' + this.$route.params.model, {method: 'POST'})
        .then(res => res.json())
        .then(res => {
          if (res["status"] == "success") {

            if (res["city"]["in"]) {
              let cityIn = res["city"]["in"];

              this.metaData.title = `Hyundai ${this.$route.params.model} в наличии в ${cityIn}`;
              this.metaData.description = `Hyundai ${this.$route.params.model} в наличии в ${cityIn} - характеристики, цена, скидки.`;
            }

            if (res["model_image"]){
              this.modelImage = res["model_image"];
            }

            this.cars = res["data"];
            this.dealers = res["city"]["dealers"];
            this.filterCarList = this.filterCars();
            this.countCars = this.filterCarList.length;
            this.loadPage = true;
            clearTimeout(errorTimeout);

          } else if (res["status"] == 'not-found') {
            this.$router.replace({name: 'NotFound'});

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
</script>
