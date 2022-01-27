<template>
  <section>
    <div class="container">
      <template v-if="dataLoad && !error">
        <ModelFilter :cars="filterCarList" :count="countCars" @get-cars="filterCars"/>
        <ModelCarList :cars="filterCarList" :model="$route.params.model"/>
      </template>
      <ModelPreload v-else-if="!dataLoad  && !error" />
      <Error v-else />
    </div>
    <FormRequest/>
  </section>
</template>

<script>
import ModelFilter from "./model/ModelFilter";
import FormRequest from "./main-page/FormRequest";
import ModelCarList from "./model/ModelCarList";
import ModelPreload from "./model/ModelPreload";
import Error from "./Error";

export default {
  name: "ModelList",
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
      dataLoad: false
    }
  },
  methods: {
    filterCars(filter = undefined){
      let cars = this.cars;

      if (filter){
        let {colors} = filter;

        this.filterCarList = cars.filter(el => {
          if (el["color"]) {
            return colors.includes(el["color"]["name"])
          }
        });

        this.countCars = this.filterCarList.length;

        return this.filterCarList;
      } else return cars;
    }
  },
  computed: {

  },
  mounted() {
    fetch('https://agat-hyundai.ru/ajax/api_instock.php?data=model-cars&model=' + this.$route.params.model, {method: 'POST'})
        .then(res => res.json())
        .then(res => {
          let $this = this;

          if (res["status"] == "success") {
            $this.cars = res["data"];
            $this.filterCarList = this.filterCars();
            $this.countCars = $this.filterCarList.length;
            $this.dataLoad = true;

          } else {
            $this.error = true;
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

</style>
