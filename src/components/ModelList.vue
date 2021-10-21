<template>
  <section>
    <div class="container">
      <ModelFilter/>
      <ModelCarList/>
    </div>
    <FormRequest/>
  </section>
</template>

<script>
import ModelFilter from "./model/ModelFilter";
import FormRequest from "./main-page/FormRequest";
import ModelCarList from "../components/model/ModelCarList";

export default {
  name: "ModelList",
  components: {
    ModelFilter,
    FormRequest,
    ModelCarList
  }
}
</script>

<style scoped>

</style>
