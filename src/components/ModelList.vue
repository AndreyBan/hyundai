<template>
  <section>
    <div class="container">
      <template v-if="dataLoad && !error">
        <ModelFilter :cars="filterCarList" :count="countCars" @get-cars="filterCars"/>
        <ModelCarList :cars="filterCarList" :model="$route.params.model"/>
      </template>
      <ModelPreload v-else-if="!dataLoad  && !error"/>
      <Error v-else/>
    </div>
    <FormRequest/>
  </section>
</template>

<script>
import ModelFilter from "./model/ModelFilter";
import FormRequest from "./main-page/FormRequest";
import ModelCarList from "./model/ModelCarList";
import ModelPreload from "./model/ModelPreload";
import {mixinFilterProp} from "./mixins/mixinFilterProp";
import Error from "./Error";

export default {
  name: "ModelList",
  mixins: [mixinFilterProp],
  components: {
    ModelFilter,
    FormRequest,
    ModelCarList,
    ModelPreload,
    Error
  },
  data() {
    return {
      cars: null,
      countCars: 0,
      error: false,
      filterCarList: [],
      carsForFilter: [],
      dataLoad: false
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
      let {colors, year_of_manufacture} = filter;

      return cars.filter(el => {

        for (let i in filter) {
          if (!["colors", "year_of_manufacture"].includes(i)) {

            if (el[i]) {
                if (filter[i] && !filter[i].includes(el[i])) return false;
            } else return false;
          }
        }

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
            this.filterCarList = this.carsForFilter = this.filterCars();
            this.countCars = this.filterCarList.length;
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
