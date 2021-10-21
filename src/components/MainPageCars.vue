<template>
  <div>
    <div class="container">
      <section class="section-filter">
        <TypeCar/>
          <PriceRange/>
      </section>

      <CarList/>
    </div>
    <FormRequest/>
  </div>
</template>

<script>
import TypeCar from "./main-page/TypeCar";
import PriceRange from "./main-page/PriceRange";
import CarList from "./main-page/CarList";
import FormRequest from "./main-page/FormRequest";

export default {
  name: "MainPageFilter",
  components: {
    FormRequest,
    TypeCar,
    PriceRange,
    CarList
  }
}
</script>

<style>
.section-filter {
  padding: 42px 130px 42px 100px;
  -webkit-box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  .section-filter {
    padding: 32px 50px 44px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

@media (max-width: 767px) {
  .section-filter {
    padding: 16px 18px 28px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}
</style>
