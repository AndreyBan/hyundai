<template>
  <section>
    <div class="container">
      <ModelFilter v-if="dataLoad" :cars="cars" :count="countCars"/>
      <ModelCarList v-if="dataLoad" :cars="cars"/>
      <ModelPreload v-if="!dataLoad" />
    </div>
    <FormRequest/>
  </section>
</template>

<script>
import ModelFilter from "./model/ModelFilter";
import FormRequest from "./main-page/FormRequest";
import ModelCarList from "./model/ModelCarList";
import ModelPreload from "./model/ModelPreload";

export default {
  name: "ModelList",
  components: {
    ModelFilter,
    FormRequest,
    ModelCarList,
    ModelPreload
  },
  data() {
    return {
      cars: null,
      countCars: 0,
      error: false,
      dataLoad: false
    }
  },
  mounted() {
    fetch('https://agat-hyundai.ru/ajax/api_instock.php?data=model-cars&model=' + this.$route.params.model, {method: 'POST'})
        .then(res => res.json())
        .then(res => {
          let $this = this;

          if (res["status"] == "success") {
            $this.cars = res["data"];
            $this.countCars = res["data"].length;

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
